# Physics Nerd — Project Status (handoff, 2026-11-24)

Start every new session with: **"Read PROJECT_STATUS.md and continue."**

Physics Nerd is the user's YouTube Shorts channel. Each episode is a short (≈50–68 s) **reaction** to an iconic movie scene with a quick physics breakdown, narrated by an AI voice. It's a reaction, not an explainer. No fake engineer/expert persona, no on-screen source citations. The user is budget-conscious: keep replies short.

## Where things stand
- **EP01–EP15: all rendered** (`renders/epNN.mp4`), mastered to −14 LUFS, on `main`. Delivered to the user as two zips (EP01–08, EP09–15). Posts for YT/TikTok/FB are in `brand/posts_ep01-15.html` and in the Google Doc "Physics Nerd – Posts EP01–EP15" (in the user's Physics Nerd Drive folder).
- **EP16–EP25 (Season 3 doc): scripts ✅ passed final review** → `episodes/physics_nerd_scripts_ep16_to_ep25.md` (source Google Doc link at the top). Review notes and **footage trim windows** in `episodes/SCRIPTS_S4_REVIEW.md`. **Next:** the user records the 10 voices in Google Vids and trims the 10 movies (send them a .bat like `tools/windows/trim_movies_clean.bat` once they give the exact movie file names).
- Files named `SCRIPTS_S2_REVIEW.md` (EP06–10) and `SCRIPTS_S3_REVIEW.md` (EP11–15) are older reviews; all their fixes were applied.

## Rules the user set
- Gemini writes scripts; **Claude fact-checks every number and checks every line against the footage** (contact sheets). Nothing is recorded until the user approves the text.
- **Voice = Google AI Studio** from EP16 on (more expressive; WAV exports in Drive folder https://drive.google.com/drive/folders/1plOnUZT0X-GAhUfU4a841oAWycllP8v3). **The only edit allowed on a voice take is volume**: if it's quiet, raise it (gain + peak limiter) so the finished Short meets YouTube's loudness standard. No roomify (the user dislikes it), no breath-trimming, no EQ or other effects; the studio plays `studio/public/epNN/vo.wav` directly. EP01–15 used Google Vids + roomify. ElevenLabs is no longer used (no credits; old takes kept in `episodes/*/elevenlabs/` or `old*/`).
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
   (makes the words JSON), then copy the original WAV to `studio/public/epNN/vo.wav` and set `voiceover: 'epNN/vo.wav'`. **No tighten_vo / roomify** (see Rules). To move an existing timeline onto a new take: `python3 -I tools/retime_vo.py epNN old_words.json`, then make sure no VO beat runs longer than its clip.
3. Find the shots: **full-decode contact sheets** (`select='between(t,a,b)*not(mod(n,12))'` + `drawtext %{pts\:flt}` + `tile`, `-fps_mode vfr`). Fast seeking (`-ss` before `-i`) is unreliable on these trims. HDR sources (Ant-Man, the first Dark Knight file) need tone-mapping (zscale+tonemap=hable). `cropdetect` for letterbox.
4. Write `episodes/NN-name/cut_clips.py` with `tools/make_cutter.py` (`write(path, doc, 'epNN', {src: 'dir/file'}, {src: (w, h, yoff)}, clips, pre='', aud={src: '""'} for stereo)`); run it, then check freeze frames on a contact sheet.
5. Timeline `studio/src/episodes/epNN.ts` (beats: `play` / `vo` / `pause`; overlays `pop`, `stamp`, `meme`, `arrow`, `spin`, `versus`, `sfx`; `at:` a spoken word). Register it in `studio/src/Root.tsx`. Fix Whisper words in `epNN.words.json` (it drives captions) or via `captionFixes`.
6. `python3 -I tools/check_vo_cuts.py epNN --fix` until 0 cuts into the voice; `cd studio && npx tsc --noEmit`; commit and push.
7. Renderer: `npx remotion render epNN ../renders/epNN.mp4 --crf 20`, then `python3 -I tools/master_audio.py renders/epNN.mp4` (−14 LUFS). See `RENDER.md`.

## Episode table
| Ep | Film | Status |
|---|---|---|
| 01–15 | Interstellar, Spider-Man 2, Civil War, Fast Five, Jurassic Park, Iron Man, Top Gun: Maverick, The Dark Knight, John Wick 4, Ant-Man, The Avengers, The Martian, MI: Rogue Nation, Infinity War, Godzilla (2014) | ✅ rendered + mastered + posts written |
| 16–25 | Furious 7, Iron Man 2, Inception, Pacific Rim, Interstellar (wave), Indiana Jones 4, The Matrix, Homecoming, Empire Strikes Back, Fast & Furious 6 | ✅ scripts · ✅ voices · ✅ footage · ✅ VO/clips/timelines on main (`studio/src/episodes/ep16–25.ts`) · ❌ render |

## EP16–25 footage (Drive folder "S3": https://drive.google.com/drive/folders/1Ae1ab7ZSr6QSUCSQKZHxyOfWKkW4_1dW)
All 11 clips checked on contact sheets; all have English audio, no burned-in subs. Scene positions (clip time):
ep16 tower jump ~3:00–3:50 · ep17 case throw/suit-up ~11:00–12:00 · ep18a van chase + zero-g hotel, van leaves bridge near end · ep18b van hits water ~10:50 · ep19 ship-as-club ~11:00–11:50 · ep20 wave ~6:10–7:00 · ep21 fridge/nuke ~6:20–7:50 (audio track 1 is Hindi: use 0:a:1 English) · ep22 bullet dodge ~8:15–8:45 · ep23 ferry split ~7:00–9:30 · ep24 asteroid field ~0:00–2:30 · ep25 runway ~0:00–9:40 (720p; occasional burned-in caption on radio lines, e.g. "Pull up, pull up!!" ~4:57).
EP16–25 prep done (2026-11-24): VO takes in `episodes/_vids_takes/`, clips cut, timelines registered, 0 VO cuts, tsc clean. **Next: renderer session renders ep16–ep25 from main + masters to −14 LUFS.** Optional cutaway photos named in the script (e.g. shattered-glass.jpg) were replaced by emoji memes; the renderer can add real ones.
Take/footage mismatches noted, not fixed (already recorded): EP17 Pepper throws the case out of the Rolls onto the track (VO says "over a racetrack barrier"); EP21 the fridge tumbles across flat desert (VO says "down a rocky hill"); EP25 VO says "two regular cars".

## Open items
- EP16–25: footage checks listed in `SCRIPTS_S4_REVIEW.md` (e.g. EP16 gap/room size/"no brakes", EP17 does Pepper kiss the case, EP25 number of cars).
- Optional cutaway photos (the renderer has been adding them, e.g. `studio/public/ep15/assets/road-repair.jpg`).
- Channel art is done (`brand/`).

## 2026-11-25: EP16–25 re-voiced
AI Studio takes in `episodes/_studio_takes/`, timelines retimed (`tools/retime_vo.py`), short clips extended, 0 VO cuts, tsc clean. **The ep16–ep25 renders on main are from the old Google Vids voices: re-render ep16–ep25 and re-master.**
Levels: the AI Studio takes come in at about -19 to -21 LUFS. The user wants them raised like before: `studio/public/epNN/vo.wav` = the take + gain to ~-16.5 LUFS + a peak-only limiter (ffmpeg `volume=XdB,alimiter=limit=0.82`), nothing else. Originals stay in `episodes/_studio_takes/`. (`bedDb` exists in the template but is unused.)

## EP26–35 (doc "S4 - EP26-35")
Scripts copied to `episodes/physics_nerd_scripts_ep26_to_ep35.md`; review + footage windows in `episodes/SCRIPTS_EP26-35_REVIEW.md` (2026-11-25). ✅ Fixes applied, scripts approved. ✅ Voices recorded (AI Studio, Drive https://drive.google.com/drive/folders/15kRUj8pDkXRV2lJ8NtgSUSomgWCt_Hvt): originals in `episodes/_studio_takes/ep26–35.wav`, leveled copies (gain + peak limiter to ~-17 LUFS) in `studio/public/epNN/vo.wav`, words JSON done; all 10 match their scripts. Caption fixes needed: EP35 McLean→McClane, Valverde→Val Verde, lid→lit, coal→cold. Trim .bat batch 1 (8 movies) = `tools/windows/trim_s4_batch1.bat`, output clips_s4. Still missing: The Dark Knight (EP30) and X-Men: Days of Future Past (EP34). Note: the F9 copy is the Director's Cut and Titanic is "Extended", so their scenes may sit later than usual (windows padded).

### EP26–35 footage (Drive folder https://drive.google.com/drive/folders/1zaKKWtOycY8Y3ttdHc2CTLN1Y-MdLyON, local `videos/s4/`)
Checked on contact sheets; all English audio, no burned-in subs. Scene positions (clip time):
ep26-speed (re-cut 1:00–1:12) jump ~6:30 (bus over the gap ~392–394 s) · ep27-ultron-a lift ~4:02–4:22, floating city ~4:56–5:16 · ep27-ultron-b core destroyed ~0:20–1:00 · (ep27-ultron-lift = pre-battle, not needed) · ep28-gravity tether ~5:00–7:15 · ep29-f9-launch rocket fires / into space ~10:00–11:00 · ep29-f9 space + satellite 0:00–2:30 · ep31-armageddon-a drilling ~12:30–14:45 · ep31-armageddon-b nuke ~8:45–9:15 · ep32 Burj climb ~3:15–9:45 (sandstorm NOT in clip: use a photo/opening desert shot) · ep33 door 0:00–10:00 · ep35 lighter/flame trail ~0:12–0:26, explosion ~0:42–1:00.
ep30-darkknight (0:47–1:06, English DTS) Joker at the party ~2:30–5:30, Rachel's fall / Batman catch ~5:45–6:20 · ep34-xmen (0:37–0:56, 720p, English) Quicksilver kitchen ~12:45–14:15. **All 10 S4 movies trimmed and checked.** Next: build EP26–35 (one at a time, like EP16–25).
