"""Cut EP17 clips from the user's Iron Man 2 trim: a = movie 0:24:00-0:36:00 (1080p 2.35, HE-AAC 7.1 English).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's3/ep17-ironman2.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep17", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1920, 816, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-toss": [
        ('a', 694.0, 696.75, 0.45),  # "In the case, please!" Pepper throws it
    ],
    "02-case": [
        ('a', 683.0, 694.0, 0.45),  # Whiplash wrecks the Rolls, "In the case, please!",
        ('a', 696.2, 699.6, 0.45),  # case lands, Tony steps on it, it unfolds
    ],
    "03-plates": [
        ('a', 699.5, 709.0, 0.5),  # plates wrap arms and chest, reactor,
        ('a', 712.2, 717.9, 0.5),  # helmet closes,
        ('a', 719.2, 720.2, 0.5),  # walks out
    ],
    "04-done": [
        ('a', 714.7, 716.4, 0.5),  # faceplate,
        ('a', 719.2, 721.7, 0.5),  # Iron Man walks out
    ],
    "05-pepper": [
        ('a', 694.85, 695.35, 0.62),  # Pepper in the back seat with the case
    ],
}


def cut(name, segs):
    args, filt = [FF, "-hide_banner", "-loglevel", "error", "-y"], []
    for i, (src, s, e, cx) in enumerate(segs):
        sw, sh, sy = ACTIVE[src]
        cw = min(sw, round(sh * W / H / 2) * 2)
        x = min(max(0, round(cx * sw - cw / 2)), sw - cw)
        args += ["-ss", f"{max(0, s - 12):.3f}", "-copyts", "-i", SRC[src]]
        af = AUD[src] or "anull"
        filt.append(f"[{i}:v:0]trim=start={s}:end={e},setpts=PTS-STARTPTS,crop={cw}:{sh}:{x}:{sy},{PRE}"
                    f"scale={W}:{H}:flags=lanczos,setsar=1,fps=30,format=yuv420p[v{i}];"
                    f"[{i}:a:0]atrim=start={s}:end={e},asetpts=PTS-STARTPTS,{af},aresample=48000[a{i}]")
    n = len(segs)
    filt.append("".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
    out = os.path.join(OUT, name + ".mp4")
    args += ["-filter_complex", ";".join(filt), "-map", "[v]", "-map", "[a]",
             "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out]
    subprocess.run(args, check=True)
    print(name, round(sum(e - s for _, s, e, _ in segs), 2), "s", flush=True)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    only = set(sys.argv[1:])
    for k, v in CLIPS.items():
        if not only or k in only:
            cut(k, v)
