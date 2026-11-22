# Physics Nerd — Project Status (handoff, 2026-11-23)

Start every new session with: **"Read PROJECT_STATUS.md and continue."**

## Workflow (agreed)
1. **Gemini writes the script.** It follows its v3 rules: no emotion tags, no subscribe-joke closers (end on the punchline), punchy incredulous hook, a "to be fair" beat, ~130–150 words.
2. **Claude fact-checks every number** and flags lines that won't match the footage. Nothing gets voiced until the user approves the final text.
3. **Voice:** ElevenLabs "Arthur" (`sfJopaWaOtauCD3HKX6Q`), `eleven_v4`, flow `er3VTfNjK6PbhZUWbToa`, **1 take, no tags**. Cost is ~1 credit per character, so ~900–1,000 per episode; pad estimates by 20%.
4. **Audio post:** `python -I tools/fetch_vo.py episodes/NN-x epNN <url>` → `python -I tools/tighten_vo.py NN-x epNN` (trims breaths) → `python -I tools/roomify.py NN-x epNN` (room sound).
5. **Timeline:** `studio/src/episodes/epNN.ts` with beat kinds `play` (movie audio), `vo` (narration over moving footage), and `pause` (click + desaturated freeze + narration). Overlays can be timed to a spoken word (`at: 'word'`, or `'word#2'` for its 2nd occurrence). Image cutaways go in `studio/public/epNN/assets/` (downscale to 1024px).
6. **Movie timing:** 2–3 s movie open, narration over moving footage, punchlines on freezes, 2–3 short movie bursts. Target 55–68 s.
7. Check stills locally (`npx remotion still`), **push**, then the **user** pastes "render epNN" into their existing cloud session ("Cloud render: EP01 v3"). Claude does NOT start new cloud sessions or render locally (the laptop is 4 GB / i3).

## Episodes
| Ep | Scene | Script | Voice | Clips | Render |
|---|---|---|---|---|---|
| 01 | Interstellar docking | ✅ Gemini v3, fact-checked | ✅ (977 cr) | ✅ cut | ✅ rendered, approved by user |
| 05 | Jurassic Park T. rex vs Jeep | ✅ Claude v3, approved | ✅ (844 cr), subscribe line cut | ❌ needs movie in `videos/jurassicpark/` | — |
| 02 | Spider-Man 2 train | ✅ Gemini v3, fact-checked, approved | ✅ (862 cr) | ✅ cut (`cut_clips.py`) | ⏳ user to send "render ep02" |
| 03 | Civil War helicopter | ✅ Gemini v3; **check the footage: railing or ledge?** before voicing | ❌ | ❌ needs movie | — |
| 04 | Fast Five vault | ✅ Gemini v3, fact-checked | ❌ | ❌ needs movie | — |

Scripts live in `episodes/NN-*/script.md`. Old rejected versions are in `failed/`. **ElevenLabs credits left: ~1,240** (enough for one more episode: EP03 or EP04).

## How to cut clips for a new movie
See `episodes/01-interstellar-docking/cut_clips.py` (ffmpeg crop to 1100x1080, H.264, stereo downmix). Find scenes with frame contact sheets plus a whisper transcript of that window. Full movies stay in `videos/` (git-ignored, never pushed).

## Key files
`RENDER.md` (cloud render steps) · `tools/` (fetch_vo, tighten_vo, roomify, make_sfx) · `studio/src/template/` (Remotion template) · `STYLE_GUIDE.md` (**outdated v2**, superseded by the rules above).
