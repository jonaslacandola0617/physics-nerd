"""Cut EP05 clips from the Jurassic Park (1993) BluRay x265 rip into studio/public/ep05/clips.

Same pipeline as EP01/EP02. The source is 1920x1040 (no letterbox), so the default crop is
1060x1040; audio is the English EAC3 7.1 track (a:0) downmixed to stereo.
Run:  python -I cut_clips.py [clip names...]
"""
import glob, os, subprocess, sys

try:
    import imageio_ffmpeg
    FF = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    import shutil
    FF = shutil.which("ffmpeg") or "ffmpeg"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MOVIE = (glob.glob(os.path.join(ROOT, "videos", "jurassicpark", "*.mkv"))
         or glob.glob(os.path.join(ROOT, "videos", "Jurassic Park*.mkv")))[0]
OUT = os.path.join(ROOT, "studio", "public", "ep05", "clips")
W, H = 1100, 1080
SRC_W, SRC_H = 1920, 1040
MAXW = round(SRC_H * W / H / 2) * 2  # 1060

# (start, end, cx, cy, w)   cx/cy = crop centre as a fraction of the 1920x1040 frame
CLIPS = {
    "01-chase-start":    [(4843.50, 4847.00, 0.45, 0.50, MAXW)],  # 1:20:43 rex emerges from the trees behind the Jeep
    "02-rex-roar":       [(4874.00, 4876.20, 0.42, 0.50, MAXW)],  # 1:21:14 rex roaring right behind the Jeep
    "03-rex-legs":       [(4868.00, 4874.00, 0.38, 0.50, MAXW),   # 1:21:08 rex bursts through the log, legs beside the Jeep
                          (4880.00, 4886.60, 0.45, 0.50, MAXW)],  # 1:21:20 rex running behind Ellie
    "04-must-go-faster": [(4850.30, 4853.30, 0.62, 0.50, MAXW)],  # 1:20:50 Malcolm: "Must go faster."
    "05-jeep-gaining":   [(4847.00, 4849.00, 0.50, 0.50, MAXW),   # 1:20:47 Jeep tearing off
                          (4853.00, 4858.00, 0.48, 0.50, MAXW)],  # 1:20:53 rex behind, Jeep bouncing ("Fifth gear!")
    "06-muldoon":        [(4888.60, 4891.00, 0.50, 0.50, MAXW)],  # 1:21:28 Muldoon at the wheel
    "07-mirror":         [(4859.00, 4862.00, 0.62, 0.50, MAXW)],  # 1:20:59 side mirror: rex lunges, sticker visible
    "08-malcolm":        [(4892.00, 4896.50, 0.52, 0.50, MAXW)],  # 1:21:32 Malcolm looking back
    "09-jeep-off":       [(4897.50, 4900.50, 0.50, 0.50, MAXW)],  # 1:21:37 Jeep speeding away
}

PAN = "pan=stereo|FL=0.8*FC+0.6*FL+0.4*SL+0.3*LFE|FR=0.8*FC+0.6*FR+0.4*SR+0.3*LFE"


def crop(cx, cy, w):
    h = round(w * H / W / 2) * 2
    x = min(max(0, round(cx * SRC_W - w / 2)), SRC_W - w)
    y = min(max(0, round(cy * SRC_H - h / 2)), SRC_H - h)
    return f"crop={w}:{h}:{x}:{y},scale={W}:{H}:flags=lanczos,setsar=1,fps=30"


def cut(name, segs):
    args, filt = [FF, "-hide_banner", "-loglevel", "error", "-y"], []
    for i, (s, e, cx, cy, w) in enumerate(segs):
        args += ["-ss", f"{s:.3f}", "-t", f"{e - s:.3f}", "-i", MOVIE]
        filt.append(f"[{i}:v:0]{crop(cx, cy, w)},format=yuv420p[v{i}];[{i}:a:0]{PAN},aresample=48000[a{i}]")
    n = len(segs)
    filt.append("".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
    out = os.path.join(OUT, name + ".mp4")
    args += ["-filter_complex", ";".join(filt), "-map", "[v]", "-map", "[a]",
             "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out]
    subprocess.run(args, check=True)
    print(name, round(sum(e - s for s, e, *_ in segs), 2), "s", flush=True)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    only = set(sys.argv[1:])
    for k, v in CLIPS.items():
        if not only or k in only:
            cut(k, v)
