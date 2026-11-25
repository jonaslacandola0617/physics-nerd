"""Cut EP29 clips from the user's F9 (Director's Cut) trim: s = movie 1:58:00-2:20:00 (1920x800 2.40, AAC stereo English). The ground launch is not in this cut; the car is shown already in orbit.
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
SRC = {"s": glob.glob(os.path.join(ROOT, "videos", 's4/ep29-f9.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep29", "clips")
W, H = 1100, 1080
ACTIVE = {'s': (1920, 800, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"s": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-boost": [
        ('s', 123.2, 126.2, 0.5),  # the Fiero, rocket firing, over Earth,
        ('s', 133.2, 134.2, 0.5),  # boosting at the satellite
    ],
    "02-float": [
        ('s', 21.6, 24.9, 0.5),  # duct-taped Fiero floating in orbit
    ],
    "03-space": [
        ('s', 10.0, 14.5, 0.5),  # the satellite over Earth,
        ('s', 21.6, 24.9, 0.5),  # the car in orbit,
        ('s', 123.2, 126.2, 0.5),  # the little rocket firing,
        ('s', 15.0, 18.0, 0.5),  # Roman and Tej in the cabin,
        ('s', 29.0, 31.0, 0.4),  # the dashboard
    ],
    "05-helmet": [
        ('s', 41.0, 45.0, 0.5),  # Roman in his diving helmet
    ],
    "06-smash": [
        ('s', 133.2, 138.2, 0.5),  # the Fiero smashes through the satellite
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
