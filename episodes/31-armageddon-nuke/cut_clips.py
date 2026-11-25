"""Cut EP31 clips from the user's Armageddon trims: a = movie 1:38:00-1:56:00, b = 2:10:00-2:25:00 (1920x800 2.40, DTS 5.1 English). Dark: gamma lifted.
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's4/ep31-armageddon-a.mkv'))[0], "b": glob.glob(os.path.join(ROOT, "videos", 's4/ep31-armageddon-b.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep31", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1920, 800, 0), 'b': (1920, 800, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = "eq=gamma=1.25,"       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN, "b": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-split": [
        ('b', 537.5, 543.5, 0.5),  # the nuke splits the surface,
        ('b', 549.5, 554.5, 0.5),  # the halves rush past
    ],
    "03-drill": [
        ('a', 736.7, 750.0, 0.5),  # the drilling rig on the asteroid,
        ('a', 778.8, 786.0, 0.5),  # the crew at the drill
    ],
    "04-nuke": [
        ('b', 519.5, 521.0, 0.5),  # zero barrier,
        ('b', 525.5, 528.5, 0.5),  # the countdown, Harry,
        ('b', 537.5, 543.5, 0.5),  # detonation,
        ('b', 544.5, 546.5, 0.5),  # the flash
    ],
    "05-rock": [
        ('b', 516.5, 518.5, 0.5),  # the asteroid surface
    ],
    "06-cheer": [
        ('b', 560.0, 564.0, 0.5),  # Earth celebrates
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
