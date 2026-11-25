"""Cut EP30 clips from the user's The Dark Knight trim: a = movie 0:47:00-1:06:00 (1080p, 2.40 letterbox at y=140, DTS 5.1 English). Night footage: gamma lifted.
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's4/ep30-darkknight.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep30", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1908, 800, 140)}
PRE = "eq=gamma=1.45:brightness=0.02,"       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-catch": [
        ('a', 357.4, 361.2, 0.5),  # Rachel thrown out, Batman dives after her,
        ('a', 370.9, 373.4, 0.5),  # cape flares, they slam onto the taxi
    ],
    "02-roof": [
        ('a', 374.1, 384.1, 0.5),  # Rachel on top of Batman on the crushed roof
    ],
    "03-cape": [
        ('a', 357.4, 359.5, 0.5),  # thrown out of the window,
        ('a', 361.6, 368.7, 0.5),  # falling down the tower,
        ('a', 370.9, 372.4, 0.5),  # the cape flares
    ],
    "04-impact": [
        ('a', 372.4, 373.4, 0.5),  # onto the taxi roof
    ],
    "05-driver": [
        ('a', 369.5, 370.6, 0.5),  # the cab driver sipping coffee,
        ('a', 373.1, 374.0, 0.5),  # his window shatters
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
