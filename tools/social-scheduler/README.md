# Physics Nerd Facebook + Instagram tool (Windows)

A free tool that puts the Physics Nerd shorts on your **Facebook Page** and your **Instagram** account as Reels. It opens your real Google Chrome, where you sign in yourself (it never sees your password), and then it does the clicking: it adds the video, pastes the caption and sets the date.

- **Facebook:** it schedules **all** the Reels in one sitting through Meta Business Suite. Facebook then posts each one by itself on its day. Your PC only has to be on while the tool is scheduling.
- **Instagram:** Instagram's website has **no schedule button**, so the tool posts **the Reel that's due today**, right away. Either run `3-INSTAGRAM-POST-TODAY.bat` once a day, or turn on the **autopilot** so Windows runs it for you every day.

## What you need (one time)

1. **Google Chrome**.
2. **Node.js**, the free "LTS" version from https://nodejs.org.
3. **This folder**, extracted somewhere like `Documents\physics-nerd-social`.

You don't need to copy the videos: the tool **downloads them by itself** (about 30–50 MB each) into its `videos` folder, and skips any it already has.

## First time

1. Double-click **`0-SETUP.bat`**. It installs the tool, downloads the 15 videos (about 600 MB in total, so give it a few minutes) and checks the schedule. If the download is interrupted, run it again: it carries on where it stopped.
2. Double-click **`1-LOGIN.bat`**. Chrome opens with two tabs:
   - **Tab 1 (Business Suite):** sign in to Facebook with the account that manages the Physics Nerd Page. If you manage more than one Page, switch to Physics Nerd at the top left.
   - **Tab 2 (Instagram):** sign in to the Physics Nerd Instagram account and tick "Save login info".
   - Set Facebook and Instagram to **English**, because the tool reads the English button names. Then close Chrome.

## The schedule

One Reel a day at **7:00 pm Philippine time**, Episodes 1 to 15, starting **Wednesday 25 November 2026** (the last one is on 9 December). It's the same day on Facebook and Instagram. The captions are the Facebook posts we wrote. The Instagram ones have extra tags like `#reels`. You can edit any caption in `schedule.json` with Notepad.

To start on another day, or at another time, open a Command Prompt in this folder and run:

```
npm run plan -- --start 2026-11-27
npm run plan -- --start 2026-11-27 --time 18:00
npm run plan -- --start 2026-11-27 --every 2      (one every 2 days)
```

Then run `npm run check`. Anything already scheduled or posted keeps its date.

## Facebook: schedule everything

Double-click **`2-FACEBOOK-SCHEDULE-ALL.bat`**.

- For each Reel it fills everything in and **stops before clicking Schedule**. Press **Enter** to schedule it, type **s** to skip it, or **d** if you clicked Schedule yourself.
- It will **never click "Share"**, because "Share" posts the Reel immediately instead of scheduling it.
- If a step shows **✗**, do that one step by hand in the tab, then press Enter. A screenshot is saved in the `debug` folder; send it to Claude so the step can be fixed.
- Business Suite only lets you schedule about 4 weeks ahead. All 15 dates fit.

## Instagram: post today's Reel

**By hand:** double-click **`3-INSTAGRAM-POST-TODAY.bat`** on each posting day. It fills everything in and stops before **Share**. Press Enter to post it.

**Autopilot:** double-click **`4-INSTAGRAM-AUTOPILOT-ON.bat`** once. Every day at 7:00 pm, Windows runs the tool, which posts the Reel due that day **without asking** and writes what it did to `instagram-log.txt`. For it to work:
- your PC has to be **on and signed in to Windows** at 7:00 pm;
- your PC's clock has to be on **Philippine time** (the task runs at 7:00 pm PC time).

If a day is missed (for example, the PC was off), the next run posts the overdue Reel. It still posts only one Reel per run, so a missed day never dumps several at once. If any step needs a human, the autopilot does **not** click Share: it leaves the tab open and writes "needs-you" in the log. Use **`5-INSTAGRAM-AUTOPILOT-OFF.bat`** to stop it.

Double-click **`STATUS.bat`** at any time to see what's scheduled on Facebook and what's posted on Instagram.

## Be aware

- **This is untested on the real sites.** It passed a dry run on fake copies of Business Suite and Instagram, but Meta changes its pages often. Expect a few ✗ steps the first time. Do those steps by hand, and send the screenshots from `debug` so they can be fixed.
- **Platform rules:** Meta's terms don't allow automated use of Facebook or Instagram without their permission. The tool uses your own signed-in Chrome and works at a human pace, and, unless you use the autopilot, you click the last button yourself. Even so, Meta could ask you to sign in again or restrict the account. The fully allowed way is to post by hand. Linking Instagram to the Facebook Page in Business Suite would let Business Suite schedule both, if you get that working later.
- **The AI label:** the narration is an AI voice. If Facebook or Instagram shows an "AI label" switch, the tool turns it on.
