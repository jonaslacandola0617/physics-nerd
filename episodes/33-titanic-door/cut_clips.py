"""Cut EP33 clips from the user's Titanic (Extended) trim: a = movie 2:48:00-3:12:00 (1916x820 2.34, EAC3 5.1 English). Night water: gamma lifted. The 'Jack tries to climb on' moment is just before this window.
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's4/ep33-titanic.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep33", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1916, 820, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = "eq=gamma=1.3,"       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-panel": [
        ('a', 413.4, 417.8, 0.55),  # wide: Rose on the panel, Jack in the water
    ],
    "02-room": [
        ('a', 413.4, 417.8, 0.5),  # Rose on the panel,
        ('a', 92.1, 99.6, 0.5),  # Jack in the water beside the panel,
        ('a', 84.1, 86.1, 0.5),  # the floating panel,
        ('a', 396.4, 400.4, 0.5),  # Rose on the panel
    ],
    "03-waterline": [
        ('a', 396.4, 405.4, 0.5),  # Rose on the panel, Jack holding on
    ],
    "04-hands": [
        ('a', 87.1, 91.1, 0.5),  # Jack and Rose talking,
        ('a', 418.4, 419.8, 0.5),  # hands
    ],
    "05-sink": [
        ('a', 549.5, 563.5, 0.5),  # Rose slides off into the water
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
