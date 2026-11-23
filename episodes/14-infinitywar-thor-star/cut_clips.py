"""Cut EP14 clips from the user's clean Infinity War trims: a = movie 1:22:00-1:40:00, b = 1:40:00-1:50:00 (1720x720 BluRay, AAC stereo).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 'clean/ep14-infinitywar.mkv'))[0], "b": glob.glob(os.path.join(ROOT, "videos", 'clean/ep14-infinitywar-b.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep14", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1720, 720, 0), 'b': (1720, 720, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": "", "b": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-iris": [
        ('b', 154.6, 156.7, 0.5),  # Thor forces the iris open,
        ('b', 160.6, 162.6, 0.5),  # in the beam
    ],
    "02-rings": [
        ('a', 777.8, 782.0, 0.5),  # the giant rings around the star,
        ('a', 800.3, 806.0, 0.5),  # Rocket's pod,
        ('a', 844.4, 849.9, 0.5),  # the dead star reignites
    ],
    "03-pod": [
        ('a', 819.8, 821.8, 0.5),  # pod engines,
        ('a', 821.8, 823.0, 0.5),  # Rocket,
        ('a', 856.4, 860.8, 0.5),  # star flares, Rocket,
        ('a', 868.9, 872.0, 0.5),  # beam through the rings
    ],
    "04-beam": [
        ('b', 183.2, 185.6, 0.5),  # beam through the iris,
        ('b', 189.2, 192.0, 0.5),  # Thor screaming in the light
    ],
    "05-pour": [
        ('b', 199.2, 202.0, 0.5),  # molten metal pours,
        ('b', 206.2, 208.0, 0.5),  # the mold
    ],
    "06-close": [
        ('b', 208.2, 209.4, 0.5),  # iris and beam
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
