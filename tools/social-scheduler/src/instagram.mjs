// Posts one Reel on instagram.com. Instagram's website has no "schedule" option,
// so this posts right away: run it on the day (by hand, or with the daily
// autopilot task). Every step falls back to "please do it by hand" if
// Instagram has changed the page, and a Reel is only recorded as posted once
// Instagram says it was shared.
import { ask, norm, stepper } from './util.mjs';

const HOME = 'https://www.instagram.com/';

async function dismissPopups(page) {
  for (let round = 0; round < 4; round++) {
    const btn = page.getByRole('button', { name: /^(not now|ok|okay|got it|close|cancel|dismiss|maybe later)$/i })
      .filter({ visible: true }).first();
    if (!(await btn.count())) return;
    // "Cancel" only for the notification / save-login prompts, never inside the post dialog.
    if (/^cancel$/i.test(norm(await btn.innerText().catch(() => ''))) && (await page.getByText(/create new post|new reel|crop|write a caption/i).filter({ visible: true }).count())) return;
    await btn.click({ timeout: 3_000 }).catch(() => {});
    await page.waitForTimeout(600);
  }
}

/** The button with this text inside the open post dialog (Next / Share sit in its header). */
function dialogButton(page, name) {
  return page.getByRole('dialog').getByRole('button', { name }).filter({ visible: true }).last()
    .or(page.getByRole('button', { name }).filter({ visible: true }).last()).first();
}

async function pasteCaption(page, box, text) {
  await box.click({ timeout: 5_000 }).catch(async () => { await box.focus(); });
  await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.press('Delete');
  await box.evaluate((el, t) => {
    el.focus();
    const dt = new DataTransfer();
    dt.setData('text/plain', t);
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  }, text);
  await page.waitForTimeout(1000);
  const flat = (x) => String(x).replace(/\s+/g, '').toLowerCase();
  if (!flat(await box.innerText()).startsWith(flat(text).slice(0, 25))) {
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.press('Delete');
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) await page.keyboard.type(lines[i], { delay: 15 });
      if (i < lines.length - 1) await page.keyboard.press('Enter');
    }
    await page.waitForTimeout(600);
  }
  const shown = await box.innerText();
  if (!flat(shown).startsWith(flat(text).slice(0, 25)) || !flat(shown).includes(flat(text).slice(-15))) {
    throw new Error(`the caption box shows "${norm(shown).slice(0, 80)}"`);
  }
}

async function saveShot(page, ep, what) {
  try {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const { DEBUG_DIR } = await import('./util.mjs');
    fs.mkdirSync(DEBUG_DIR, { recursive: true });
    const shot = path.join(DEBUG_DIR, `instagram-ep${ep}-${what}.png`);
    await page.screenshot({ path: shot });
    console.log(`     screenshot: ${shot}`);
  } catch { /* optional */ }
}

export async function postInstagram(context, ep, file, opts) {
  const page = await context.newPage();
  try {
    return await postOn(page, ep, file, opts);
  } catch (err) {
    console.log(`   ✗ ${String(err.message).split('\n')[0].slice(0, 200)}`);
    console.log(`     page: ${page.url()}`);
    await saveShot(page, ep.ep, 'failed');
    throw err;
  }
}

async function postOn(page, ep, file, { auto }) {
  const ig = ep.instagram;
  await page.bringToFront();
  const { step, manual } = stepper('Instagram', page, ep.ep);

  await page.goto(HOME, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await page.waitForLoadState('load', { timeout: 30_000 }).catch(() => {});
  await page.waitForTimeout(2500);
  if (/accounts\/login|challenge|suspended/.test(page.url()) || (await page.locator('input[name="username"]').filter({ visible: true }).count())) {
    throw new Error('Not signed in to Instagram. Run 1-LOGIN.bat first.');
  }
  await dismissPopups(page);

  // 1. Open "Create" → "Post" and give it the video.
  const fileInput = async () => {
    for (const fr of page.frames()) {
      const inp = fr.locator('input[type="file"]').first();
      if (await inp.count().catch(() => 0)) return inp;
    }
    return null;
  };
  let attached = false;
  for (let attempt = 0; attempt < 2 && !attached; attempt++) {
    const create = page.getByRole('link', { name: /^(new post|create)$/i }).filter({ visible: true }).first()
      .or(page.locator('svg[aria-label="New post"]').filter({ visible: true }).first()).first();
    await create.click({ timeout: 15_000 });
    await page.waitForTimeout(1500);
    // Newer layouts show a small menu: Post / Live video / Ad.
    const postItem = page.getByRole('link', { name: /^post$/i }).or(page.getByRole('menuitem', { name: /^post$/i }))
      .or(page.getByText('Post', { exact: true })).filter({ visible: true }).first();
    if (await postItem.count()) { await postItem.click({ timeout: 5_000 }).catch(() => {}); await page.waitForTimeout(1500); }
    let inp = null;
    for (let i = 0; i < 10 && !(inp = await fileInput()); i++) await page.waitForTimeout(800);
    if (inp) { await inp.setInputFiles(file); attached = true; break; }
    const pick = page.getByRole('button', { name: /select from (computer|device)/i }).filter({ visible: true }).first();
    if (await pick.count()) {
      const chooser = page.waitForEvent('filechooser', { timeout: 15_000 });
      await pick.click().catch(() => {});
      const fc = await chooser.catch(() => null);
      if (fc) { await fc.setFiles(file); attached = true; }
    }
  }
  if (!attached) throw new Error('couldn\'t open "Create" and add the video');
  console.log('   ✓ adding the video');
  await page.waitForTimeout(3000);

  // "Video posts are now shared as reels" → OK.
  const ok = page.getByRole('button', { name: /^ok$/i }).filter({ visible: true }).first();
  if (await ok.isVisible({ timeout: 8_000 }).catch(() => false)) await ok.click().catch(() => {});

  await step('keep the original 9:16 shape', async () => {
    const cropBtn = page.getByRole('button', { name: /select crop/i }).filter({ visible: true }).first()
      .or(page.locator('svg[aria-label="Select crop"]').filter({ visible: true }).first()).first();
    if (!(await cropBtn.count())) return; // no crop control: already the reel shape
    await cropBtn.click({ timeout: 5_000 });
    await page.waitForTimeout(600);
    const orig = page.getByText(/^(original|9:16)$/i).filter({ visible: true }).first();
    await orig.click({ timeout: 5_000 });
    await page.waitForTimeout(600);
  });

  await step('go to the caption step', async () => {
    for (let i = 0; i < 3; i++) {
      const cap = page.locator('[contenteditable="true"][aria-label*="caption" i], [contenteditable="true"][role="textbox"]').filter({ visible: true });
      if (await cap.count()) return;
      const next = dialogButton(page, /^next$/i);
      await next.waitFor({ state: 'visible', timeout: 60_000 });
      await next.click({ timeout: 10_000 });
      await page.waitForTimeout(2500);
    }
    await page.locator('[contenteditable="true"]').filter({ visible: true }).first().waitFor({ timeout: 20_000 });
  });

  await step('write the caption', async () => {
    const box = page.locator('[contenteditable="true"][aria-label*="caption" i]').filter({ visible: true }).first()
      .or(page.locator('[contenteditable="true"][role="textbox"]').filter({ visible: true }).first()).first();
    await box.waitFor({ state: 'visible', timeout: 30_000 });
    await pasteCaption(page, box, ig.caption);
    await page.keyboard.press('Escape').catch(() => {}); // close the hashtag suggestions
    await page.waitForTimeout(500);
  });

  // The AI-voice label: Instagram shows "Add AI label" under Advanced settings on some accounts.
  if (ig.aiLabel !== false) {
    const adv = page.getByText(/^advanced settings$/i).filter({ visible: true }).first();
    if (await adv.count()) await adv.click().catch(() => {});
    const label = page.getByText(/add ai label|ai label|made with ai/i).filter({ visible: true }).first();
    if (await label.count()) {
      await step('turn on the AI label (the narration is an AI voice)', async () => {
        const row = label.locator('xpath=ancestor::*[.//*[@role="switch"] or .//input[@type="checkbox"]][1]');
        const sw = row.locator('[role="switch"], input[type="checkbox"]').first();
        const on = (await sw.getAttribute('aria-checked')) === 'true' || (await sw.isChecked().catch(() => false));
        if (!on) await sw.click({ force: true });
      });
    }
  }

  const share = dialogButton(page, /^share$/i);
  console.log(`\n   Instagram is filled in for Episode ${ep.ep} (${ep.film}). Clicking Share posts it RIGHT NOW.`);
  if (manual.length) console.log(`   Do these by hand first: ${manual.join('; ')}.`);
  let answer = '';
  if (!auto || manual.length) {
    if (auto && manual.length) {
      console.log('   Autopilot: something needs a human, so I did NOT click Share. The tab stays open.');
      return { status: 'needs-you' };
    }
    answer = (await ask('   Check the Instagram tab. Press Enter to click Share, type "d" if you clicked it yourself, or "s" to skip: ')).toLowerCase();
    if (answer === 's') return { status: 'skipped' };
  }
  if (answer !== 'd') {
    await share.waitFor({ state: 'visible', timeout: 30_000 });
    await share.click({ timeout: 15_000 });
  }

  console.log('   … uploading (this can take a minute)');
  const done = page.getByText(/(reel|post) (has been|was) shared|your (reel|post) has been shared/i).filter({ visible: true }).first();
  const confirmed = await done.waitFor({ timeout: 300_000 }).then(() => true).catch(() => false);
  if (confirmed) {
    console.log('   ✓ Instagram says it was shared');
    const close = page.getByRole('button', { name: /^close$/i }).filter({ visible: true }).first()
      .or(page.locator('svg[aria-label="Close"]').filter({ visible: true }).first()).first();
    await close.click().catch(() => {});
    await page.waitForTimeout(1500);
    await page.close().catch(() => {});
    return { status: 'posted' };
  }
  await saveShot(page, ep.ep, 'no-confirmation');
  if (auto) {
    // Don't risk posting it twice tomorrow: record it as "check" and leave the tab open.
    console.log('   ? I didn\'t see "shared". Check your profile; the tab stays open.');
    return { status: 'check' };
  }
  const a = (await ask('   I didn\'t see Instagram\'s "shared" message. Did it post? (y/N) ')).toLowerCase();
  return { status: a === 'y' ? 'posted' : 'not-posted' };
}
