# Movie-Physics Shorts — Production Playbook

## 1. What the two reference Shorts actually do

| | Scene Mechanics (Pacific Rim, 70s) | Michael Ross (Avengers, 62s) |
|---|---|---|
| Format | 9:16 vertical, 720x1280 | 9:16 vertical, 608x1080 |
| Layout | Blurred movie frame as background, sharp clip in the middle third, bold 2-line title pinned at top for the whole video | Same layout. Title is a white box with serif text. Small "MR" watermark |
| Captions | One big word at a time at the bottom of the clip | 2–3 words at a time, key word highlighted in yellow |
| Hook (0–5s) | A question: "why do robots always put the important part in the chest?" | Shock line: "Tony Stark is dead again" |
| Body | **One** claim, built step by step: 1,980 t ÷ 8 helicopters = 250 t each. A real CH-47 lifts about 13 t, so you'd need about 153 Chinooks. Then the cable angles. Then synchronisation | 2 claims: the glass is 1–2 in thick, so he dies. The suit opening up adds drag and makes it tumble |
| Visuals | Numbers drawn right on the scene, labels on the helicopters, arrows, real-world photo (Chinook), meme cut-ins every 3–5s | Arrows ("Drag Force"), stock photos (glass thickness), CFD/airflow diagrams, red "Death!" text pop-ups |
| Ending | A joke: "give the engineers a raise" | A joke: "hell of a coder" |
| Voice | Casual, fast, about 170 wpm | Calm, dry, about 150 wpm |

**What makes them work:** one scene, one checkable number, a real-world comparison (a Chinook, glass thickness), a joke at the end, and a visual change every 1–3 seconds.

## 2. Positioning (read this first)

You're not an engineer, so **don't call yourself one** in your title, bio or voiceover. A fake credential is the fastest way to lose a science audience, and commenters *will* check. You don't need one anyway, because the hook is the math, not who's doing it. Honest angles that still sound good:

- "I checked the math on ___" / "Does ___ actually work?"
- A persona such as "the guy with a calculator", "Physics Police", or "Plot Armor Audit"
- The narration can still sound confident and technical. It just never claims a degree or job.

**Decided:** no sources on screen, same as the reference channels. I still check every number behind the scenes so the math holds up against comments.

Also: don't copy the other channels' title-bar styles, names or watermarks. Build your own look (I'll design it).

## 3. Platform rules to respect

- **Movie clips:** keep each clip short and only use what the analysis needs. Talk over it, and keep the commentary and annotations as the main content. Expect some Content ID claims anyway. Disney/Marvel claims usually take the revenue rather than block the video, but that varies.
- **AI voice:** a synthetic narrator voice is fine. **Never** clone a real person's voice (e.g., Michael Ross). Turn on YouTube's "altered or synthetic content" label if a video ever shows a realistic fake person or event.
- **Monetization:** YouTube demonetizes "inauthentic / mass-produced" channels. Every video needs a genuinely new calculation and its own script. That's another reason to do one solid analysis per video instead of templated filler.

## 4. The pipeline — who does what

| Step | You | Me |
|---|---|---|
| Pick scene | Choose the movie and scene (or pick from my list) | Suggest scenes that have checkable physics |
| Source footage | Supply the movie file / clip (legally obtained), 1080p if possible | — |
| Research and math | — | Find the published specs, do the calculation, cite sources |
| Script | Approve and tweak | Write a 45–75s script: hook → one claim → comparison → twist → joke |
| Voice | Approve the voice (or record it yourself; see below) | Generate the voiceover with ElevenLabs (connected; uses your credits) |
| Edit | Watch the draft, give notes | Cut the clips, 9:16 layout, title bar, word-by-word captions, number/arrow overlays, diagrams, export MP4 |
| Upload | Title, description, upload | Write the title, description, hashtags |

## 5. What I need from you, per video

1. **The movie file**, or a clip that covers the scene, dropped into `videos/` (a folder per movie is fine).
2. **Timestamps** of the scene(s), e.g., `Pacific Rim 00:52:10–00:52:40`. If you don't know them, tell me the scene and I'll find it by scanning the file.
3. **Meme cut-ins (kept light):** I'll research what's trending and give you a list with links. You save the ones you like into `memes/`. Between memes, I fill in with diagrams, text pops and zooms.
4. **Optional facecam:** a 10–20s video of you reacting while watching the scene. It raises retention a lot, but isn't required.

## 6. One-time setup

- **Channel name and look**: tell me your pick, or I'll propose 3.
- **Voice (decided):** an ElevenLabs AI voice, using your credits. I'll generate 2–3 samples of the first hook line for you to pick from, then reuse that voice for every video. No cloned real-person voices.
- **ffmpeg**: I installed a bundled copy through Python, so nothing is needed. Optionally, `winget install Gyan.FFmpeg` gives you a normal install.

## 7. Starter topic ideas (each has one clean calculation)

- **Interstellar** — Miller's planet: 1 hour = 7 years. What black-hole spin and orbit does that require, and would the tidal forces make those waves?
- **Armageddon** — Splitting a Texas-sized asteroid with one nuke: the energy needed vs. the largest bomb ever detonated (Tsar Bomba).
- **The Dark Knight Rises** — Batman's 5-mile blast radius bomb: 6 miles away in a few seconds of flight. Is that safe?
- **Gravity** — Debris cloud hitting every ~90 minutes: what orbit gives that period?
- **Fast & Furious 7** — Car jumping between the Etihad Towers: launch speed needed vs. the gap.
- **Iron Man 3** — Catching 13 falling people midair: the g-forces on each person.
