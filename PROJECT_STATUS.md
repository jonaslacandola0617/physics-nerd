# Physics Nerd — Project Status (handoff, 2026-11-23)

Start every new session with: **"Read PROJECT_STATUS.md and continue."**

## Where work happens now (from 2026-11-23)
- **Everything runs in a cloud session.** The user's laptop (4 GB, i3) is too slow, so they no longer work locally.
- **Movies are not in git.** The user uploads each movie to **Google Drive** and pastes the link. Download it to `videos/<movie>/` inside the cloud container (git-ignored), e.g. with `gdown <link>` (`pip install gdown`; for big files use `gdown --fuzzy <link>`). If Drive blocks the download (quota or permissions), tell the user to set the file to "Anyone with the link".
- The cloud session cuts clips, builds timelines, checks stills **and renders** (see `RENDER.md`). Commit the cut clips (`studio/public/epNN/clips/`) like EP01/02/05. Never commit the full movies.
- `cut_clips.py` files find ffmpeg on their own (`imageio_ffmpeg` or `ffmpeg` on PATH).

## Workflow (agreed)
1. **Gemini writes the script.** It follows its v3 rules: no emotion tags, no subscribe-joke closers (end on the punchline), punchy incredulous hook, a "to be fair" beat, ~130–150 words.
2. **Claude fact-checks every number** and checks every line against the actual footage (contact sheets of the scene). Nothing gets voiced until the **user approves the final text in chat**.
3. **Voice:** ElevenLabs "Arthur" (`sfJopaWaOtauCD3HKX6Q`), `eleven_v4`, flow `er3VTfNjK6PbhZUWbToa` (paid workspace), **1 take, no tags**. Cost = 1 credit per character (EP02: 862 chars → 862 cr). Always run an `estimate_only` first.
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
| 01 | Interstellar docking | ✅ | ✅ (977 cr) | ✅ | ✅ rendered, approved |
| 02 | Spider-Man 2 train | ✅ | ✅ (862 cr) | ✅ | ✅ rendered (`renders/ep02.mp4`, with photo cutaways) |
| 05 | Jurassic Park T. rex vs Jeep | ✅ | ✅ (844 cr) | ✅ | ✅ rendered (`renders/ep05.mp4`) |
| 04 | Fast Five vault | ✅ **approved by user** (closer: "Friction: zero. Family: undefeated.") | ❌ **next**: 873 chars vs 857 credits, see below | ❌ user is uploading the movie (50 GB) to Drive | — |
| 03 | Civil War helicopter | ✅ Gemini v3; **check footage: railing or ledge?** | ❌ | ❌ **skipped for now** (no footage) | — |
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
