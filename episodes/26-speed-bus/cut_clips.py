"""Cut EP26 clips from the user's Speed re-cut: a = movie 1:00:00-1:12:00 (1080p, 2.35 letterbox at y=132, AC3 5.1 English track 0).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's4/ep26-speed.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep26", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1918, 816, 132)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-jump": [
        ('a', 389.4, 395.0, 0.5),  # "Hold on!" bus leaves the ledge, nose up over the gap
    ],
    "02-air": [
        ('a', 392.4, 394.9, 0.42),  # bus nose-up in mid-air over the gap
    ],
    "03-road": [
        ('a', 370.4, 376.9, 0.5),  # bus speeding down the flat freeway, speedometer at 67,
        ('a', 384.9, 389.4, 0.5),  # through the windshield: flat road to the gap
    ],
    "04-edge": [
        ('a', 392.0, 393.0, 0.42),  # front wheels crossing the edge
    ],
    "05-gap": [
        ('a', 320.3, 332.4, 0.5),  # the unfinished freeway gap from above
    ],
    "06-land": [
        ('a', 396.9, 402.0, 0.5),  # bus lands on the far side and keeps rolling
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
