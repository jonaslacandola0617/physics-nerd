#!/usr/bin/env node
// Physics Nerd Facebook + Instagram Reels tool. Commands:
//   login                          open Chrome so you can sign in to Facebook (Business Suite) and Instagram (once)
//   plan --start YYYY-MM-DD [--time 19:00] [--every 1] [--order 1-15]
//   check                          check the schedule and the videos folder
//   facebook [--days 60] [--max-days 28] [--ep N] [--auto]
//                                  schedule the Facebook Reels in Business Suite (they post themselves later)
//   instagram [--auto] [--ep N] [--all-due]
//                                  post the Instagram Reel that is due today (Instagram's website can't schedule)
//   status                         show what is scheduled / posted
import fs from 'node:fs';
import {
  VIDEOS_DIR, humanPause, loadSchedule, loadState, localTime, markState, phDate, saveSchedule, videoPath,
} from './util.mjs';

const [, , cmd = 'help', ...rest] = process.argv;
const flags = {};
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith('--')) {
    const k = rest[i].slice(2);
    flags[k] = rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[++i] : true;
  }
}

const DAY = 86400e3;
const MAX_DAYS = Number(flags['max-days'] || 28);
const todayPH = () => phDate(new Date().toISOString());
const stamp = () => new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

// ---------- check ----------
function problems(schedule) {
  const out = [];
  const warn = [];
  for (const e of schedule.episodes) {
    const tag = `Episode ${e.ep}`;
    for (const p of ['facebook', 'instagram']) {
      const x = e[p];
      if (!x.caption) out.push(`${tag}: no ${p} caption.`);
      else if (x.caption.length > 2200) out.push(`${tag}: ${p} caption over 2,200 characters (${x.caption.length}).`);
      if ((x.caption.match(/#/g) || []).length > 30) out.push(`${tag}: ${p} caption has more than 30 hashtags.`);
      if (!x.publishAt) warn.push(`${tag}: no ${p} date yet (run plan).`);
      else if (Number.isNaN(Date.parse(x.publishAt))) out.push(`${tag}: ${p} time "${x.publishAt}" is not a valid date/time.`);
    }
    if (!fs.existsSync(videoPath(e))) warn.push(`${tag}: video missing: put ${e.file} in the videos folder.`);
  }
  return { out, warn };
}

// ---------- plan ----------
function parseOrder(spec, all) {
  if (!spec) return all;
  return String(spec).split(',').flatMap((part) => {
    const [a, b] = part.split('-').map(Number);
    if (!b) return [a];
    const s = a <= b ? 1 : -1;
    return Array.from({ length: Math.abs(b - a) + 1 }, (_, i) => a + i * s);
  });
}

/** One Reel every --every days from --start, same day and time on Facebook and Instagram. Finished ones keep their dates. */
function plan() {
  const schedule = loadSchedule();
  const start = flags.start;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start || '')) throw new Error('Give a start date: --start 2026-11-25');
  const time = flags.time || schedule.defaults.time;
  if (!/^\d{2}:\d{2}$/.test(time)) throw new Error('Give the time as HH:MM (24-hour), e.g. --time 19:00');
  const every = Number(flags.every || 1);
  const state = loadState();
  const byEp = new Map(schedule.episodes.map((e) => [e.ep, e]));
  const done = (e) => state[e.ep]?.facebook?.status === 'scheduled' || ['posted', 'check'].includes(state[e.ep]?.instagram?.status);
  const order = parseOrder(flags.order, schedule.episodes.map((e) => e.ep)).filter((n) => byEp.has(n));
  let day = new Date(`${start}T00:00:00Z`);
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (const n of order) {
    const e = byEp.get(n);
    if (done(e)) { console.log(`           Episode ${String(n).padStart(2)}  ${e.film}   (already done, kept)`); continue; }
    const ymd = day.toISOString().slice(0, 10);
    const at = `${ymd}T${time}:00${schedule.defaults.utcOffset}`;
    e.facebook.publishAt = at;
    e.instagram.publishAt = at;
    console.log(`${ymd} ${names[day.getUTCDay()]}  Episode ${String(n).padStart(2)}  ${e.film}`);
    day = new Date(day.getTime() + every * DAY);
  }
  schedule.defaults.time = time;
  saveSchedule(schedule);
  console.log(`\nSaved schedule.json (Philippine time, ${time}). Run "npm run check" to double-check it.`);
  console.log('If the Instagram autopilot is on, run 4-INSTAGRAM-AUTOPILOT-ON.bat again so its daily time matches.');
}

// ---------- status ----------
function status() {
  const schedule = loadSchedule();
  const state = loadState();
  const rows = [...schedule.episodes].sort((a, b) => Date.parse(a.facebook.publishAt || 0) - Date.parse(b.facebook.publishAt || 0));
  console.log('Date (PH)   Ep  Video  Facebook    Instagram   Film');
  for (const e of rows) {
    const d = e.facebook.publishAt ? phDate(e.facebook.publishAt) : '—'.padEnd(10);
    const v = fs.existsSync(videoPath(e)) ? 'yes' : 'NO';
    console.log(`${d}  ${String(e.ep).padStart(2)}  ${v.padEnd(5)}  ${(state[e.ep]?.facebook?.status || '-').padEnd(10)}  ${(state[e.ep]?.instagram?.status || '-').padEnd(10)}  ${e.film}`);
  }
}

function needVideo(e) {
  if (!fs.existsSync(videoPath(e))) throw new Error(`Video missing for Episode ${e.ep}: put ${e.file} in ${VIDEOS_DIR}`);
}

// ---------- facebook ----------
async function facebook() {
  const sched = loadSchedule();
  const { out } = problems(sched);
  if (out.length) { console.log(out.join('\n')); throw new Error('Fix the schedule first (npm run check).'); }
  const days = Number(flags.days || 60);
  const state = loadState();
  const now = Date.now();
  const todo = sched.episodes
    .filter((e) => !flags.ep || String(e.ep) === String(flags.ep))
    .filter((e) => e.facebook.publishAt && Date.parse(e.facebook.publishAt) > now && Date.parse(e.facebook.publishAt) <= now + days * DAY)
    .filter((e) => state[e.ep]?.facebook?.status !== 'scheduled')
    .sort((a, b) => Date.parse(a.facebook.publishAt) - Date.parse(b.facebook.publishAt));
  if (!todo.length) { console.log(`Nothing left to schedule on Facebook in the next ${days} days.`); return; }
  console.log(`To schedule on Facebook (next ${days} days):`);
  for (const e of todo) console.log(`  ${phDate(e.facebook.publishAt)}  Episode ${e.ep}  ${e.film}`);

  const { openChrome } = await import('./chrome.mjs');
  const { scheduleFacebook } = await import('./facebook.mjs');
  const { context } = await openChrome();
  let failsInARow = 0;
  for (const e of todo) {
    const at = Date.parse(e.facebook.publishAt);
    if (at > Date.now() + MAX_DAYS * DAY) { console.log(`\nEpisode ${e.ep}: more than ${MAX_DAYS} days ahead; run again closer to the date.`); continue; }
    if (at < Date.now() + 30 * 60e3) { console.log(`\nEpisode ${e.ep}: too close to now, skipped.`); continue; }
    needVideo(e);
    console.log(`\n▶ Episode ${e.ep} on Facebook: ${localTime(e.facebook.publishAt).label}`);
    try {
      const r = await scheduleFacebook(context, e, videoPath(e), { auto: Boolean(flags.auto) });
      if (r.status === 'scheduled') markState(e.ep, 'facebook', r);
      failsInARow = 0;
      console.log(`   → ${r.status}`);
    } catch (err) {
      console.log(`   ✗ Facebook failed: ${err.message.split('\n')[0]}`);
      if (/signed in/.test(err.message) || ++failsInARow >= 2) {
        console.log('\nStopping here so the same problem doesn\'t repeat for every episode. Nothing after this was touched.');
        break;
      }
    }
    await humanPause(3000, 6000);
  }
  console.log('\nDone. Check Meta Business Suite → Content → Scheduled to see them.');
}

// ---------- instagram ----------
async function instagram() {
  const sched = loadSchedule();
  const state = loadState();
  const today = todayPH();
  let todo;
  if (flags.ep) {
    todo = sched.episodes.filter((e) => String(e.ep) === String(flags.ep));
  } else {
    // Due = its date (Philippine time) is today or earlier, and it hasn't been posted.
    todo = sched.episodes
      .filter((e) => e.instagram.publishAt && phDate(e.instagram.publishAt) <= today)
      .filter((e) => !['posted', 'check'].includes(state[e.ep]?.instagram?.status))
      .sort((a, b) => Date.parse(a.instagram.publishAt) - Date.parse(b.instagram.publishAt));
    // One Reel per run unless told otherwise, so a missed day doesn't dump several at once.
    if (!flags['all-due']) todo = todo.slice(0, 1);
  }
  console.log(`[${stamp()}] Instagram, ${today} (Philippine date)`);
  if (!todo.length) { console.log('Nothing due on Instagram today.'); return; }
  for (const e of todo) {
    if (['posted', 'check'].includes(state[e.ep]?.instagram?.status) && flags.ep) {
      console.log(`Episode ${e.ep} is already recorded as ${state[e.ep].instagram.status}. Not posting it twice.`);
      continue;
    }
    needVideo(e);
  }
  const { openChrome } = await import('./chrome.mjs');
  const { postInstagram } = await import('./instagram.mjs');
  const { context } = await openChrome();
  for (const e of todo) {
    if (['posted', 'check'].includes(loadState()[e.ep]?.instagram?.status)) continue;
    console.log(`\n▶ Episode ${e.ep} on Instagram: ${e.film}`);
    try {
      const r = await postInstagram(context, e, videoPath(e), { auto: Boolean(flags.auto) });
      if (['posted', 'check'].includes(r.status)) markState(e.ep, 'instagram', r);
      console.log(`   → ${r.status}`);
    } catch (err) {
      console.log(`   ✗ Instagram failed: ${err.message.split('\n')[0]}`);
      break;
    }
    await humanPause(4000, 8000);
  }
}

// ---------- main ----------
try {
  if (cmd === 'login') {
    const { openChrome, PROFILE_DIR } = await import('./chrome.mjs');
    await openChrome(['https://business.facebook.com/latest/home', 'https://www.instagram.com/']);
    console.log(`Chrome is open with the Physics Nerd profile (${PROFILE_DIR}).`);
    console.log('Tab 1: sign in to Facebook with the account that manages the Physics Nerd Page, and open the Page in Business Suite.');
    console.log('Tab 2: sign in to the Physics Nerd Instagram account. Tick "Save login info" if asked.');
    console.log('Set both to English (the tool reads the English labels). Then close Chrome. You only need to do this once.');
  } else if (cmd === 'plan') plan();
  else if (cmd === 'check') {
    const { out, warn } = problems(loadSchedule());
    for (const w of warn) console.log('note: ' + w);
    for (const o of out) console.log('PROBLEM: ' + o);
    console.log(out.length ? `\n${out.length} problem(s) to fix.` : '\nSchedule OK.');
    if (out.length) process.exitCode = 1;
  } else if (cmd === 'facebook') await facebook();
  else if (cmd === 'instagram') await instagram();
  else if (cmd === 'status') status();
  else {
    console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 11).join('\n'));
  }
} catch (err) {
  console.error('\nError: ' + err.message);
  process.exitCode = 1;
}
process.exit();
