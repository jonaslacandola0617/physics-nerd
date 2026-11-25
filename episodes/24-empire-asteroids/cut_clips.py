"""Cut EP24 clips from the user's The Empire Strikes Back re-cut: a = movie 0:38:00-0:52:00 (1080p 2.39 AV1, EAC3 5.1 English track 0).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's3/ep24-empire.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep24", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1920, 804, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-field": [
        ('a', 50.0, 52.0, 0.5),  # the Falcon passes a giant asteroid,
        ('a', 66.5, 68.7, 0.5),  # weaving between rocks
    ],
    "03-ties": [
        ('a', 62.0, 66.5, 0.5),  # tumbling asteroids,
        ('a', 70.0, 73.0, 0.5),  # TIE fighter explodes,
        ('a', 76.0, 79.6, 0.5),  # another TIE hits a rock,
        ('a', 105.0, 108.9, 0.5),  # skimming the big asteroid
    ],
    "04-surface": [
        ('a', 109.0, 120.6, 0.5),  # Falcon over the asteroid surface, TIEs chasing
    ],
    "05-odds": [
        ('a', 57.4, 61.8, 0.5),  # "approximately 3,720 to 1" "Never tell me the odds."
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
