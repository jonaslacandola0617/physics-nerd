"""Cut EP01 clips from the Interstellar Blu-ray rip into studio/public/ep01/clips.

Each clip = one or more segments (movie seconds), each cropped to the 1100x1080
clip-box aspect around (cx, cy) with crop width w (source px; smaller = tighter zoom).
Output: H.264 8-bit yuv420p, 1100x1080 @ 30fps, AAC stereo (English 5.1 downmix).
Run:  python cut_clips.py
"""
import glob, os, subprocess

try:
    import imageio_ffmpeg
    FF = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    import shutil
    FF = shutil.which("ffmpeg") or "ffmpeg"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MOVIE = glob.glob(os.path.join(ROOT, "videos", "interstellar", "*Interstellar*.mkv"))[0]
OUT = os.path.join(ROOT, "studio", "public", "ep01", "clips")
W, H = 1100, 1080

# (start, end, cx, cy, w)   cx/cy = crop centre as a fraction of the 1920x1080 frame
CLIPS = {
    "01-spin-topdown":   [(7652.30, 7658.70, 0.73, 0.40, 760)],   # 2:07:32 top-down, ring spinning over ice
    "02-not-possible":   [(7699.50, 7704.10, 0.47, 0.50, 1100)],  # 2:08:19.5 "It's not possible" / "No. It's necessary."
    "03-modules-close":  [(7708.90, 7714.50, 0.50, 0.50, 1100)],  # 2:08:29 spinning modules seen from the Ranger
    "04-from-ranger":    [(7690.70, 7694.15, 0.69, 0.50, 700),    # 2:08:11 top-down, Ranger closing in
                          (7717.30, 7721.05, 0.43, 0.42, 820)],   # 2:08:37 Endurance + Ranger over the planet
    "05-modules-zoom":   [(7728.10, 7734.30, 0.50, 0.48, 1100)],  # 2:08:48 modules spinning, hub centred
    "06-cooper-brand":   [(7788.50, 7793.70, 0.42, 0.50, 1100)],  # 2:09:48 Cooper, then Brand, straining
    "07-modules-boom":   [(7775.90, 7780.94, 0.55, 0.50, 1100),   # 2:09:36 spinning modules + Ranger
                          (7645.75, 7648.65, 0.32, 0.45, 1100)],  # 2:07:26 the explosion
    "08-spin-far":       [(7797.20, 7801.35, 0.72, 0.50, 900),    # 2:09:57 Endurance spinning, side view
                          (7682.30, 7685.40, 0.55, 0.50, 1100)],  # 2:08:02 Ranger thrusters
    "09-thrusters-axis": [(7676.40, 7678.10, 0.55, 0.50, 1100),   # 2:07:56 Ranger thrusters firing
                          (7868.95, 7874.45, 0.53, 0.50, 1100)],  # 2:11:09 Ranger on the hub, thrusters, spin axis
    "10-blackout":       [(7874.55, 7879.50, 0.50, 0.50, 1100)],  # 2:11:14 Brand, then Cooper, nearly out
    "11-clamps-lock":    [(7826.40, 7830.00, 0.45, 0.50, 1100)],  # 2:10:26 clamp closes -> "...locked!"
    "12-survivable":     [(7856.70, 7858.75, 0.50, 0.50, 1100),   # 2:10:56 Ranger clamped in the port
                          (7976.85, 7983.20, 0.52, 0.50, 1100)],  # 2:12:57 the shredded ring
    "13-ring-close":     [(8003.55, 8009.50, 0.47, 0.50, 1100)],  # 2:13:23 damaged ring module + Gargantua
}

PAN = "pan=stereo|FL=0.8*FC+0.6*FL+0.4*SL+0.3*LFE|FR=0.8*FC+0.6*FR+0.4*SR+0.3*LFE"


def crop(cx, cy, w):
    h = round(w * H / W / 2) * 2
    x = min(max(0, round(cx * 1920 - w / 2)), 1920 - w)
    y = min(max(0, round(cy * 1080 - h / 2)), 1080 - h)
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
    print(name, round(sum(e - s for s, e, *_ in segs), 2), "s")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for k, v in CLIPS.items():
        cut(k, v)
