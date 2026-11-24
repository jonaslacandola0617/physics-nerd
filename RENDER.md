# Physics Nerd: cloud render instructions

This repo holds everything needed to render an episode except the full movies. The laptop finds the scenes and cuts them into short clips (`studio/public/epNN/clips/*.mp4`, H.264, a few MB each), pushes them, and the cloud renders.

## For the cloud render session: "render epNN"

1. Pull the latest `main`.
2. Install, once per machine:
   ```bash
   cd studio
   npm ci
   # Remotion downloads its own headless Chrome. On a bare Linux box it may need:
   # sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 \
   #   libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 libpango-1.0-0 libcairo2
   ```
3. Check that the episode is complete: every beat in `studio/src/episodes/epNN.ts` has a `clip.file`, and each file exists under `studio/public/`. If any are missing, **stop and report which ones**. Don't render placeholders.
   Then check that no beat cuts off a word (from the repo root):
   ```bash
   python3 -I tools/check_vo_cuts.py epNN
   ```
   It measures the real voiceover audio at every pause/play cut. If it reports a cut into the voice, run it again with `--fix` (moves the cut into the nearest silence between the same two words), check the diff of `studio/src/episodes/epNN.ts`, and commit that fix with the render. Never render with this check failing: Whisper's word end times are early, so a `to:` copied from them clips the end of the word.
   **The video must show the moment it reacts to.** Before rendering, look at the opening `play` beat's clip (a frame every 0.5 s) and confirm it plays the actual event the episode is about (the shot being fired, the car flying, the wave), with its own movie audio, not setup or a reaction shot. If it doesn't, open on the clip that shows the event. If no clip in `studio/public/epNN/clips/` shows it, **stop and report** which shot is missing (it has to be cut from the movie on the laptop); don't render around it.
   **No emoji cards.** Every `meme` overlay uses a photo (`file: 'epNN/assets/…'`). If an episode still has emoji, list the photos needed and wait for them.
4. Typecheck: `npx tsc --noEmit`
5. Render:
   ```bash
   npx remotion render epNN ../renders/epNN.mp4 --crf 20
   ```
   Then master the audio to YouTube loudness (−14 LUFS, −1 dBTP; video is copied untouched), from the repo root:
   ```bash
   python3 -I tools/master_audio.py renders/epNN.mp4
   ```
6. Spot-check: extract a frame every ~8s with ffmpeg and look at them. Confirm the audio track exists and the duration matches the composition.
7. Commit **only** `renders/epNN.mp4` to `main` with the message `render: epNN`, and push.
8. Report: the duration, file size, and anything that looked wrong.

## Google Drive upload (automatic)
`.github/workflows/upload-renders.yml` copies `renders/*.mp4` to the Drive folder "Final Output" every time a push to `main` changes a render. Nothing to do in the render session: pushing the render is enough. Only new or changed files are uploaded, and a re-render replaces the old copy. To re-sync everything by hand: GitHub, Actions tab, "Upload renders to Google Drive", Run workflow.

One-time setup (on the laptop):
1. Install rclone: https://rclone.org/downloads/ (Windows: `winget install Rclone.Rclone`).
2. Run `rclone authorize "drive"`. A browser opens: sign in with the Google account that owns "Final Output" and allow access.
3. The terminal prints a token between `--->` and `<---End paste`. Copy the whole `{...}` line.
4. On GitHub: repo Settings, Secrets and variables, Actions, New repository secret. Name `RCLONE_DRIVE_TOKEN`, value: that `{...}` line.
5. Actions tab, "Upload renders to Google Drive", Run workflow, to upload the existing renders.

The token gives full access to that Google Drive, so keep it only in the GitHub secret. To revoke it: https://myaccount.google.com/permissions, remove "rclone".

## Rules
- Never commit the full movie files (`videos/` is git-ignored for a reason; the repo must stay private).
- Keep every file under 90 MB (GitHub's hard limit is 100 MB per file).
- Don't edit episode content (scripts, timelines, voiceovers). Rendering only, unless asked.

## Layout
- `episodes/NN-name/`: script.md, the voiceover takes (take-A/B.mp3), word timings
- `studio/`: the Remotion project (template in `src/template/`, one data file per episode in `src/episodes/`)
- `studio/public/epNN/`: vo.mp3, clips/, memes/
- `tools/fetch_vo.py`: downloads ElevenLabs takes and transcribes them (laptop side)
- `renders/`: finished videos from the cloud
