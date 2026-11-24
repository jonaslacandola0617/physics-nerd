// Dry run of the Facebook and Instagram steps against fake pages in test/.
// It never touches the real sites: every facebook.com / instagram.com request
// is answered locally. Run: npm test (needs Chrome, or CHROME_PATH).
import fs from 'node:fs';
import path from 'node:path';
import { TOOL_DIR, loadSchedule, localTime } from './util.mjs';
import { openChrome } from './chrome.mjs';
import { scheduleFacebook } from './facebook.mjs';
import { postInstagram } from './instagram.mjs';

const { context } = await openChrome();
const mock = (name) => fs.readFileSync(path.join(TOOL_DIR, 'test', name), 'utf8');
await context.route(/facebook\.com/, (route) => {
  const body = /reels_composer/.test(route.request().url()) ? mock('mock-facebook.html') : '<html><body>ok</body></html>';
  route.fulfill({ contentType: 'text/html', body });
});
await context.route(/instagram\.com/, (route) => route.fulfill({ contentType: 'text/html', body: mock('mock-instagram.html') }));
const fake = path.join(TOOL_DIR, 'test', 'fake.mp4');
fs.writeFileSync(fake, Buffer.alloc(5 * 1024 * 1024));
let fb = null; let ig = null; let sharedNow = false;
context.on('console', (m) => {
  const x = m.text();
  if (x === 'FB:SHARED-NOW') sharedNow = true;
  else if (x.startsWith('FB:')) fb = JSON.parse(x.slice(3));
  else if (x.startsWith('IG:')) ig = JSON.parse(x.slice(3));
});

const ep = structuredClone(loadSchedule().episodes.find((e) => e.ep === 1));
ep.facebook.publishAt = '2026-11-25T19:00:00+08:00';
const flat = (x) => String(x).replace(/\s+/g, '');

const r1 = await scheduleFacebook(context, ep, fake, { auto: true });
const t = localTime(ep.facebook.publishAt);
const fbPass = !sharedNow && r1.status === 'scheduled' && fb && flat(fb.cap) === flat(ep.facebook.caption)
  && fb.d === `${String(t.month + 1).padStart(2, '0')}/${String(t.day).padStart(2, '0')}/${t.year}`
  && fb.t === `${String(((t.date.getHours() + 11) % 12) + 1).padStart(2, '0')}:${t.mm} ${t.date.getHours() < 12 ? 'AM' : 'PM'}`;
console.log('facebook:', r1, fb, fbPass ? 'PASS' : 'FAIL');

const r2 = await postInstagram(context, ep, fake, { auto: true });
const igPass = r2.status === 'posted' && ig && flat(ig.cap) === flat(ep.instagram.caption) && ig.ratio === 'original';
console.log('instagram:', r2, ig, igPass ? 'PASS' : 'FAIL');

fs.rmSync(fake);
for (const p of context.pages()) if (p.url().startsWith('http')) await p.close().catch(() => {});
console.log(fbPass && igPass ? '\nSELFTEST PASSED (fake pages only)' : '\nSELFTEST FAILED');
process.exit(fbPass && igPass ? 0 : 1);
