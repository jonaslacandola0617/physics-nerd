"""Cut EP12 clips from the user's trimmed The Martian (2015) file (movie 2:01:00-2:15:00, 1080p BluRay, 2.39 letterbox, AC3 5.1).
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
SRC = {"mt": glob.glob(os.path.join(ROOT, "videos", 's3/ep12-martian.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep12", "clips")
W, H = 1100, 1080
ACTIVE = {'mt': (1920, 800, 140)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"mt": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-poke": [
        ('mt', 396.9, 399.0, 0.5),  # Watney at his glove (the puncture),
        ('mt', 444.4, 445.4, 0.5),  # flying arm-first
    ],
    "02-thrust": [
        ('mt', 385.3, 387.6, 0.6),  # Lewis out on the tether,
        ('mt', 420.4, 424.0, 0.5),  # Watney leaves the MAV pod,
        ('mt', 437.9, 440.1, 0.5),  # flying over Mars,
        ('mt', 440.4, 442.0, 0.5),  # close: arm out,
        ('mt', 444.4, 445.5, 0.5),  # arm-first,
        ('mt', 451.9, 453.1, 0.5),  # the glove jet pushing him
    ],
    "03-tumble": [
        ('mt', 424.0, 426.6, 0.5),  # tumbling over Mars,
        ('mt', 437.9, 440.1, 0.5),  # spinning,
        ('mt', 442.4, 444.0, 0.45),  # far from Hermes,
        ('mt', 453.4, 455.7, 0.5),  # closing in
    ],
    "04-catch": [
        ('mt', 457.4, 459.6, 0.5),  # Lewis grabs him,
        ('mt', 463.0, 466.0, 0.5),  # the tether,
        ('mt', 474.4, 476.5, 0.5),  # reeled in
    ],
    "05-end": [
        ('mt', 484.0, 489.0, 0.5),  # Watney and Lewis, helmets together
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
