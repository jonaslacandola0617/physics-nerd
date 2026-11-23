"""Cut EP15 clips from the user's Godzilla (2014) trims: a = movie 1:28:00-1:57:00, b = 1:14:00-1:29:00 (1080p, 2.40 letterbox, AAC 5.1).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's3/ep15-godzilla.mkv'))[0], "b": glob.glob(os.path.join(ROOT, "videos", 'clean/ep15-godzilla-b.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep15", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1920, 800, 0), 'b': (1920, 800, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = "eq=gamma=1.08:contrast=1.04,"       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN, "b": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-tower": [
        ('a', 304.6, 308.2, 0.4),  # Godzilla towering between downtown skyscrapers
    ],
    "02-bridge": [
        ('b', 682.5, 691.0, 0.5),  # dorsal plates cutting through the bay,
        ('b', 739.5, 742.5, 0.55),  # at the Golden Gate
    ],
    "03-walk": [
        ('b', 749.5, 753.5, 0.5),  # tanks firing on the bridge,
        ('b', 758.5, 760.0, 0.5),  # Godzilla,
        ('b', 762.5, 764.0, 0.5),  # soldiers,
        ('b', 765.5, 769.8, 0.5),  # through the bus window
    ],
    "04-street": [
        ('a', 296.0, 302.5, 0.5),  # people fleeing down the street
    ],
    "05-roar": [
        ('b', 739.5, 744.5, 0.55),  # head over the bridge
    ],
    "06-head": [
        ('a', 306.3, 308.2, 0.4),  # over the skyline,
        ('b', 739.5, 744.5, 0.55),  # head over the bridge,
        ('b', 686.5, 688.5, 0.5),  # plates
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
