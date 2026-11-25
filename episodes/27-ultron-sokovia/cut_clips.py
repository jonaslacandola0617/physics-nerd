"""Cut EP27 clips from the user's Age of Ultron trims: a = movie 1:46:00-2:01:00, b = 2:03:00-2:17:00 (1720x720 2.39, AAC stereo English).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's4/ep27-ultron-a.mkv'))[0], "b": glob.glob(os.path.join(ROOT, "videos", 's4/ep27-ultron-b.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep27", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1720, 720, 0), 'b': (1720, 720, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": "", "b": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-lift": [
        ('a', 250.8, 256.3, 0.5),  # Sokovia tears out of the ground
    ],
    "02-float": [
        ('a', 295.4, 298.4, 0.5),  # the city floating above the clouds,
        ('b', 12.1, 12.95, 0.5),  # aerial: city in the sky
    ],
    "03-wide": [
        ('a', 295.4, 298.6, 0.5),  # city above the clouds,
        ('b', 12.1, 12.95, 0.5),  # aerial,
        ('a', 312.4, 316.4, 0.5),  # helicarrier beside the floating slab,
        ('b', 16.1, 18.6, 0.5),  # debris falling from the slab
    ],
    "04-under": [
        ('b', 34.1, 36.3, 0.5),  # the underside: a rock cone hanging from the core,
        ('a', 245.3, 247.0, 0.5),  # Iron Man under the slab,
        ('b', 42.6, 44.0, 0.5),  # underside again,
        ('b', 58.1, 61.0, 0.5),  # rock spikes hanging off the bottom,
        ('a', 250.8, 256.8, 0.5),  # rock tearing out
    ],
    "05-blast": [
        ('b', 48.6, 49.1, 0.5),  # Tony,
        ('b', 49.1, 56.6, 0.5),  # Thor + Iron Man blast the core, the rock breaks up
    ],
    "06-ultron": [
        ('a', 836.9, 841.9, 0.5),  # Ultron
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
