# Physics Nerd — Project Status (handoff, 2026-11-24)

Start every new session with: **"Read PROJECT_STATUS.md and continue."**

Physics Nerd is the user's YouTube Shorts channel. Each episode is a short (≈50–68 s) **reaction** to an iconic movie scene with a quick physics breakdown, narrated by an AI voice. It's a reaction, not an explainer. No fake engineer/expert persona, no on-screen source citations. The user is budget-conscious: keep replies short.

## Where things stand
- **EP01–EP15: all rendered** (`renders/epNN.mp4`), mastered to −14 LUFS, on `main`. Delivered to the user as two zips (EP01–08, EP09–15). Posts for YT/TikTok/FB are in `brand/posts_ep01-15.html` and in the Google Doc "Physics Nerd – Posts EP01–EP15" (in the user's Physics Nerd Drive folder).
- **EP16–EP25 (Season 3 doc): scripts ✅ passed final review** → `episodes/physics_nerd_scripts_ep16_to_ep25.md` (source Google Doc link at the top). Review notes and **footage trim windows** in `episodes/SCRIPTS_S4_REVIEW.md`. **Next:** the user records the 10 voices in Google Vids and trims the 10 movies (send them a .bat like `tools/windows/trim_movies_clean.bat` once they give the exact movie file names).
- Files named `SCRIPTS_S2_REVIEW.md` (EP06–10) and `SCRIPTS_S3_REVIEW.md` (EP11–15) are older reviews; all their fixes were applied.

## Rules the user set
- Gemini writes scripts; **Claude fact-checks every number and checks every line against the footage** (contact sheets). Nothing is recorded until the user approves the text.
- **Voice = Google Vids** (user records and exports into the voiceover Drive folder). ElevenLabs is no longer used (no credits; old takes kept in `episodes/*/elevenlabs/` or `old*/`).
- **Never download from pirate streaming sites** (the user once asked to record from zxcstream.com: declined, stays declined). The user downloads movies themselves, trims them with ffmpeg (`-c copy`) using the .bat files in `tools/windows/`, and uploads only the trimmed scene files.
- Avoid movie copies with **burned-in subtitles or ad watermarks** ("Hollymoviehd", "ESub" releases had both). YTS / Pahe releases were clean. Check new files for this and for the audio language (one Dark Knight copy was a Telugu dub).
- Commit clips, timelines and renders; push to `main` (and the session branch). Never commit full movies (`videos/` is git-ignored; so is `package/`).

## Google Drive (all "Anyone with the link")
- **Physics Nerd (parent):** https://drive.google.com/drive/folders/1YeR6FiPNFc78i7PWgdVBq1xDPNNODgPp (subfolders: Videos, Images, Final Output)
- **Videos (trimmed scene files):** https://drive.google.com/drive/folders/140akuguZYs5zRXVnCVg0-2RJwY-q4GP6 (the clean copies are in its `clips_clean/` subfolder)
- **Voiceovers (Google Vids exports, "Ep N-…mp4"):** https://drive.google.com/drive/folders/1Zj2a2np450RrhKrmpiAfQBOqz3EI_X1N
- Listing: `gdown --json <folder-url>` (includes subfolders). Download one file:
  `curl -sSL -o out "https://drive.usercontent.google.com/download?id=<FILE_ID>&export=download&confirm=t"` (gdown's own download hits a blocked googleusercontent host).
- The Drive **connector** is a different Google account (`jlacandola0@…`) with view-only access to the parent folder; it *can* create small files there (Docs, text), but **uploads over 10 MB fail**. Deliver videos with SendUserFile (≤500 MB per file: split zips).

## Environment (cloud)
- Session runs in the `physics-nerd` environment. Allowed hosts include Drive (`drive.google.com`, `drive.usercontent.google.com`) and Hugging Face (`huggingface.co`, `cdn-lfs*.hf.co`, `cas-*.xethub.hf.co`, `us.aws.cdn.hf.co`) for Whisper. Run VO tools with `HF_HUB_DISABLE_XET=1`.
- Setup per fresh container: `cd studio && npm ci`; `pip install imageio-ffmpeg faster-whisper numpy gdown`.
- Remotion stills can't load Google Fonts here (Chrome doesn't trust the proxy CA; don't disable TLS checks), so **the cloud renderer session renders**; this session preps. Tell the user "render epNN from main".

## Episode pipeline (per episode)
1. Download the VO take → `episodes/_vids_takes/epNN.mp4`; transcribe and diff against the script word for word (Whisper misreads: check low-confidence words before flagging).
2. `HF_HUB_DISABLE_XET=1 python3 -I tools/fetch_vo.py episodes/NN-name epNN episodes/_vids_takes/epNN.mp4`
   → `python3 -I tools/tighten_vo.py NN-name epNN --keep 0.32` → `python3 -I tools/roomify.py NN-name epNN`
3. Find the shots: **full-decode contact sheets** (`select='between(t,a,b)*not(mod(n,12))'` + `drawtext %{pts\:flt}` + `tile`, `-fps_mode vfr`). Fast seeking (`-ss` before `-i`) is unreliable on these trims. HDR sources (Ant-Man, the first Dark Knight file) need tone-mapping (zscale+tonemap=hable). `cropdetect` for letterbox.
4. Write `episodes/NN-name/cut_clips.py` with `tools/make_cutter.py` (`write(path, doc, 'epNN', {src: 'dir/file'}, {src: (w, h, yoff)}, clips, pre='', aud={src: '""'} for stereo)`); run it, then check freeze frames on a contact sheet.
5. Timeline `studio/src/episodes/epNN.ts` (beats: `play` / `vo` / `pause`; overlays `pop`, `stamp`, `meme`, `arrow`, `spin`, `versus`, `sfx`; `at:` a spoken word). Register it in `studio/src/Root.tsx`. Fix Whisper words in `epNN.words.json` (it drives captions) or via `captionFixes`.
6. `python3 -I tools/check_vo_cuts.py epNN --fix` until 0 cuts into the voice; `cd studio && npx tsc --noEmit`; commit and push.
7. Renderer: `npx remotion render epNN ../renders/epNN.mp4 --crf 20`, then `python3 -I tools/master_audio.py renders/epNN.mp4` (−14 LUFS). See `RENDER.md`.

## Episode table
| Ep | Film | Status |
|---|---|---|
| 01–15 | Interstellar, Spider-Man 2, Civil War, Fast Five, Jurassic Park, Iron Man, Top Gun: Maverick, The Dark Knight, John Wick 4, Ant-Man, The Avengers, The Martian, MI: Rogue Nation, Infinity War, Godzilla (2014) | ✅ rendered + mastered + posts written |
| 16–25 | Furious 7, Iron Man 2, Inception, Pacific Rim, Interstellar (wave), Indiana Jones 4, The Matrix, Homecoming, Empire Strikes Back, Fast & Furious 6 | ✅ scripts approved · ❌ voices · ❌ footage |

## Open items
- EP16–25: footage checks listed in `SCRIPTS_S4_REVIEW.md` (e.g. EP16 gap/room size/"no brakes", EP17 does Pepper kiss the case, EP25 number of cars).
- Optional cutaway photos (the renderer has been adding them, e.g. `studio/public/ep15/assets/road-repair.jpg`).
- Channel art is done (`brand/`).
