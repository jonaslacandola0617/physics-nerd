"""Cut EP21 clips from the user's Indiana Jones and the Kingdom of the Crystal Skull trim: a = movie 0:14:00-0:26:00 (1080p 2.40, EAC3 5.1; track 0 is Hindi, so audio uses track 1 = English).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's3/ep21-indy4.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep21", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1920, 800, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-launch": [
        ('a', 413.6, 422.6, 0.5),  # road, car speeding, the fridge flies past
    ],
    "02-fridge": [
        ('a', 386.6, 392.6, 0.5),  # Indy climbs into the fridge, LEAD LINED label,
        ('a', 395.6, 397.2, 0.5),  # the fridge in the kitchen
    ],
    "03-blast": [
        ('a', 397.9, 399.5, 0.5),  # the flash,
        ('a', 404.6, 406.9, 0.5),  # shockwave through the town,
        ('a', 413.6, 422.6, 0.5),  # fridge launched past the car
    ],
    "04-tumble": [
        ('a', 424.2, 426.4, 0.5),  # fridge slams and tumbles,
        ('a', 436.9, 438.4, 0.4),  # Indy rolls out
    ],
    "05-cloud": [
        ('a', 452.0, 458.0, 0.45),  # Indy faces the mushroom cloud, hat on
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
                    f"[{i}:a:1]atrim=start={s}:end={e},asetpts=PTS-STARTPTS,{af},aresample=48000[a{i}]")
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
