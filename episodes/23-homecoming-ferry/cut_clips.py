"""Cut EP23 clips from the user's Spider-Man: Homecoming trim: a = movie 1:10:00-1:24:00 (1728x720 x264, AAC stereo).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's3/ep23-homecoming.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep23", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1728, 720, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-hold": [
        ('a', 503.6, 509.6, 0.5),  # Peter between the two halves, arms out
    ],
    "02-wide": [
        ('a', 510.6, 511.6, 0.5),  # wide: both halves,
        ('a', 484.5, 498.6, 0.5),  # ferry splits, halves tilt, webs across the deck
    ],
    "03-webs": [
        ('a', 457.5, 459.6, 0.5),  # web lines stuck across the deck,
        ('a', 496.5, 498.6, 0.5),  # webs on the railings,
        ('a', 512.6, 517.6, 0.5),  # webs straining
    ],
    "04-ironman": [
        ('a', 519.6, 521.6, 0.5),  # webs snapping,
        ('a', 528.9, 530.9, 0.5),  # Iron Man flies in
    ],
    "05-tony": [
        ('a', 670.5, 673.4, 0.62),  # Tony scolds Peter
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
