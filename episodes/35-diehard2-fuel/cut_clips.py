"""Cut EP35 clips from the user's Die Hard 2 trim: a = movie 1:50:00-2:05:00 (1920x812 2.35, EAC3 5.1 English).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's4/ep35-diehard2.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep35", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1920, 812, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-trail": [
        ('a', 22.7, 26.6, 0.5),  # lighter drops, the flame races along the fuel trail,
        ('a', 41.4, 43.6, 0.5),  # the 747 blows up
    ],
    "02-race": [
        ('a', 24.4, 26.6, 0.5),  # the flame trail racing across the snow
    ],
    "03-zippo": [
        ('a', 17.0, 23.4, 0.5),  # McClane in the snow, flicks the Zippo,
        ('a', 0.7, 7.3, 0.5),  # the snowstorm, the plane leaking fuel
    ],
    "04-snow": [
        ('a', 26.7, 30.3, 0.5),  # the snowy runway at night
    ],
    "05-plane": [
        ('a', 37.0, 41.3, 0.5),  # the 747 accelerating down the runway
    ],
    "06-boom": [
        ('a', 41.7, 47.7, 0.5),  # the fireball,
        ('a', 54.7, 57.0, 0.5),  # debris
    ],
    "07-mcclane": [
        ('a', 61.4, 66.0, 0.5),  # McClane in the snow, lit by the fire
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
