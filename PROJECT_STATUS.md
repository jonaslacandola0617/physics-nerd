# Physics Nerd — Project Status (handoff, 2026-11-23)

Start every new session with: **"Read PROJECT_STATUS.md and continue."**

## Where work happens now (from 2026-11-23)
- **Everything runs in a cloud session.** The user's laptop (4 GB, i3) is too slow, so they no longer work locally.
- **Movies are not in git.** The user uploads each movie to **Google Drive** and pastes the link. Download it to `videos/<movie>/` inside the cloud container (git-ignored), e.g. with `gdown <link>` (`pip install gdown`; for big files use `gdown --fuzzy <link>`). If Drive blocks the download (quota or permissions), tell the user to set the file to "Anyone with the link".
- The cloud session cuts clips, builds timelines, checks stills **and renders** (see `RENDER.md`). Commit the cut clips (`studio/public/epNN/clips/`) like EP01/02/05. Never commit the full movies.
- `cut_clips.py` files find ffmpeg on their own (`imageio_ffmpeg` or `ffmpeg` on PATH).

## Google Drive folders (from 2026-11-22)
- **Trimmed scene files (user cuts them with ffmpeg -c copy):** https://drive.google.com/drive/folders/140akuguZYs5zRXVnCVg0-2RJwY-q4GP6
  Have: Fast Five (movie 1:43-2:05), Iron Man (1:08-1:20), Ant-Man (0:28-0:45, 0:55-1:15, 1:35-1:55; HDR, tonemap when cutting).
  ⚠️ Fast Five's mp4 seeks inaccurately for previews: pick times from a full-decode `select` contact sheet (`%{pts}` labels), not `-ss` before `-i`.
- Google Vids takes for EP02/03/05/07/08/09 are saved in `episodes/_vids_takes/` (not processed yet). All checked word for word against their scripts.
- **Voiceovers (Google Vids exports):** https://drive.google.com/drive/folders/1Zj2a2np450RrhKrmpiAfQBOqz3EI_X1N
- **Clips & other files (the user screen-records the scenes):** https://drive.google.com/drive/folders/1YeR6FiPNFc78i7PWgdVBq1xDPNNODgPp
- Both are "Anyone with the link". List with `gdown <folder-url>` (it lists then fails on the googleusercontent redirect), then download each file with
  `curl -L -o out.mp4 "https://drive.usercontent.google.com/download?id=<FILE_ID>&export=download&confirm=t"`.
- Whisper needs the Hugging Face hosts (already allowed in the `physics-nerd` environment); run fetch_vo with `HF_HUB_DISABLE_XET=1`.

## Workflow (agreed)
1. **Gemini writes the script.** It follows its v3 rules: no emotion tags, no subscribe-joke closers (end on the punchline), punchy incredulous hook, a "to be fair" beat, ~130–150 words.
2. **Claude fact-checks every number** and checks every line against the actual footage (contact sheets of the scene). Nothing gets voiced until the **user approves the final text in chat**.
3. **Voice (NEW, 2026-11-22): Google Vids voiceover**, exported by the user to the voiceover Drive folder; no credits. Must read the approved script word for word. Then `python -I tools/fetch_vo.py episodes/NN-x epNN <downloaded file>` (local files OK).
   _Old:_ ElevenLabs "Arthur" (`sfJopaWaOtauCD3HKX6Q`), `eleven_v4`, flow `er3VTfNjK6PbhZUWbToa` (paid workspace), **1 take, no tags**. Cost = 1 credit per character (EP02: 862 chars → 862 cr). Always run an `estimate_only` first.
4. **Audio post:** `python -I tools/fetch_vo.py episodes/NN-x epNN <url>` → `python -I tools/tighten_vo.py NN-x epNN` (trims breaths) → `python -I tools/roomify.py NN-x epNN` (room sound).
5. **Timeline:** `studio/src/episodes/epNN.ts` with beat kinds `play` (movie audio), `vo` (narration over moving footage), and `pause` (click + desaturated freeze + narration). Overlays can be timed to a spoken word (`at: 'word'`, or `'word#2'`). Image cutaways go in `studio/public/epNN/assets/` (downscale to 1024px).
6. **Movie timing:** 2–3 s movie open, narration over moving footage, punchlines on freezes, 2–3 short movie bursts. Target 55–68 s.
7. Check stills (`npx remotion still`), render, push.

## ElevenLabs credits (IMPORTANT)
- **Paid account (Starter): 857 credits left**, refills **2026-12-16**. Arthur works here.
- The user also connected a **free account (10,000 credits)**, but **Arthur needs Creator tier or above**, so it fails there. Free-plan audio is also non-commercial and needs attribution. Don't switch voices: EP01/02/05 all use Arthur.
- Check which account the ElevenLabs connector is on with `account_get_usage` (tier "starter" = paid, "free" = free).

## Episodes
| Ep | Scene | Script | Voice | Clips | Render |
|---|---|---|---|---|---|
| 01 | Interstellar docking | ✅ | ✅ **re-voiced with Google Vids** (ElevenLabs take kept in `elevenlabs/`) | ✅ | ⏳ ready for re-render (timeline re-timed, cuts checked) |
| 02 | Spider-Man 2 train | ✅ | ✅ **re-voiced with Google Vids** (ElevenLabs take in `elevenlabs/`) | ✅ | ⏳ ready for re-render |
| 05 | Jurassic Park T. rex vs Jeep | ✅ | ✅ **re-voiced with Google Vids** (ElevenLabs take in `elevenlabs/`; 0.25 s pause inserted after "head.") | ✅ | ⏳ ready for re-render |
| 04 | Fast Five vault | ✅ approved | ✅ Google Vids (old ElevenLabs v2 take in `old-v2/`) | ✅ cut (vault slides flat: sparks at 1:48:10) | ⏳ **ready to render** |
| 03 | Civil War helicopter | ✅ Gemini v3; **check footage: railing or ledge?** | ❌ | ❌ **skipped for now** (no footage) | — |
| 06 | Iron Man tank shot | ✅ v3.1 | ✅ Google Vids | ✅ cut (tank hit 1:18:35, lands in rubble) | ⏳ **ready to render** (~55 s) |
| 08/09/10 | S2 fixes approved 2026-11-22 | EP08 closer + banner, EP09 hook, EP10 full rewrite (flying ant) in `physics_nerd_scripts_ep06_to_ep10.md` | ✅ re-recorded 2026-11-23 (takes in `episodes/_vids_takes/`) | EP10 ✅ cut; EP08 ✅ cut (poles visibly ripped out before the flip); EP09 needs footage | EP08 + EP10 ⏳ **ready to render** |
| 06–10 | Season 2 slate | v3.1 in `episodes/physics_nerd_scripts_ep06_to_ep10.md`, review in `episodes/SCRIPTS_S2_REVIEW.md` | ❌ | ❌ | — |

**EP04 voicing, pending the user's choice:** (a) on the paid account, drop "easily", "casually", "absolutely" (846 chars, fits 857), or (b) wait for the 2026-12-16 refill and voice it word for word. The approved text is in `episodes/04-fastfive-vault/script.md`, with the closer replaced by "Friction: zero. Family: undefeated."

**S2 status:** EP06/07/09 ready after footage checks. EP08 needs a new closer. EP10 on hold (scenes look invented). User priority after EP04 is undecided.

Scripts live in `episodes/NN-*/script.md`. Old rejected versions are in `failed/`.

## How to cut clips for a new movie
See `episodes/02-spiderman2-train/cut_clips.py` or `05-jurassicpark-trex/cut_clips.py` (letterbox-aware crop to 1100x1080, H.264, stereo downmix). Find the scene with the English subtitle track (`ffmpeg -map 0:s:0 en.srt`, grep the dialogue) plus frame contact sheets (`drawtext` timestamps + `tile`). Run `ffmpeg cropdetect` first to find the letterbox.

## Channel art
`brand/avatar.png` (800x800), `brand/banner.png` (2560x1440), `brand/description.txt`. Source: `studio/src/brand/Brand.tsx` (`npx remotion still avatar|banner`).

## Key files
`RENDER.md` (cloud render steps) · `tools/` (fetch_vo, tighten_vo, roomify, make_sfx, VO cut checker) · `studio/src/template/` (Remotion template) · `STYLE_GUIDE.md` (**outdated v2**, superseded by the rules above).
