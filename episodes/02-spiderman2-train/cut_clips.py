"""Cut EP02 clips from the Spider-Man 2 Blu-ray remux into studio/public/ep02/clips.

Same pipeline as EP01's cut_clips.py. Differences: the film is 2.39:1 (active picture
1920x804 at y=138), so the default crop is 818x804 (no letterbox bars), and audio
comes from the English 5.1 AC3 track (a:1) instead of the TrueHD 7.1 track.
Run:  python -I cut_clips.py
"""
import glob, os, subprocess

FF = r"C:\Users\ReysaL\AppData\Local\Programs\Python\Python312\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v9.0.2.exe"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MOVIE = (glob.glob(os.path.join(ROOT, "videos", "spiderman2", "*.mkv"))
         or glob.glob(os.path.join(ROOT, "videos", "Spider*Man*2*.mkv")))[0]
OUT = os.path.join(ROOT, "studio", "public", "ep02", "clips")
W, H = 1100, 1080
TOP, ACTIVE_H = 138, 804          # letterbox: active picture rows
MAXW = round(ACTIVE_H * W / H / 2) * 2  # 818

# (start, end, cx, cy, w)   cx = crop centre as a fraction of 1920; cy as a fraction of the active picture
CLIPS = {
    "01-feet-brake":   [(5882.50, 5892.00, 0.50, 0.50, MAXW)],  # 1:38:02 front of the train, feet dragging on the rails
    "02-wall-rips":    [(5919.50, 5925.40, 0.50, 0.50, MAXW)],  # 1:38:39 first webs taut -> window frame rips out of the wall -> yanked
    "03-webs-fire":    [(5936.00, 5945.50, 0.50, 0.50, MAXW)],  # 1:38:56 arms out, fans of webs to both buildings
    "04-train-wide":   [(5925.50, 5927.00, 0.50, 0.50, MAXW),   # 1:38:45 train barrelling down the track
                        (5969.00, 5973.00, 0.50, 0.50, MAXW)],  # 1:39:29 end of the line ahead, rubble
    "05-strain-arm":   [(5946.50, 5951.00, 0.50, 0.50, MAXW)],  # 1:39:06 suit tearing at the arm, gritted teeth
    "06-scream":       [(5962.80, 5968.60, 0.50, 0.50, MAXW)],  # 1:39:23 crucifix pose, screaming
    "07-strain-face":  [(5984.00, 5990.00, 0.50, 0.45, MAXW)],  # 1:39:44 close-up, teeth gritted (freeze for "world records")
    "08-pass-out":     [(5996.50, 6008.00, 0.50, 0.45, MAXW)],  # 1:39:56 eyes roll back, falls, caught by passengers
    "09-carried":      [(6013.00, 6027.00, 0.50, 0.50, MAXW)],  # 1:40:13 passed overhead through the carriage
}

PAN = "pan=stereo|FL=0.8*FC+0.6*FL+0.4*SL+0.3*LFE|FR=0.8*FC+0.6*FR+0.4*SR+0.3*LFE"


def crop(cx, cy, w):
    h = round(w * H / W / 2) * 2
    x = min(max(0, round(cx * 1920 - w / 2)), 1920 - w)
    y = min(max(TOP, round(TOP + cy * ACTIVE_H - h / 2)), TOP + ACTIVE_H - h)
    return f"crop={w}:{h}:{x}:{y},scale={W}:{H}:flags=lanczos,setsar=1,fps=30"


def cut(name, segs):
    args, filt = [FF, "-hide_banner", "-loglevel", "error", "-y"], []
    for i, (s, e, cx, cy, w) in enumerate(segs):
        args += ["-ss", f"{s:.3f}", "-t", f"{e - s:.3f}", "-i", MOVIE]
        filt.append(f"[{i}:v:0]{crop(cx, cy, w)},format=yuv420p[v{i}];[{i}:a:1]{PAN},aresample=48000[a{i}]")
    n = len(segs)
    filt.append("".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
    out = os.path.join(OUT, name + ".mp4")
    args += ["-filter_complex", ";".join(filt), "-map", "[v]", "-map", "[a]",
             "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out]
    subprocess.run(args, check=True)
    print(name, round(sum(e - s for s, e, *_ in segs), 2), "s", flush=True)


if __name__ == "__main__":
    import sys
    os.makedirs(OUT, exist_ok=True)
    only = set(sys.argv[1:])
    for k, v in CLIPS.items():
        if not only or k in only:
            cut(k, v)
