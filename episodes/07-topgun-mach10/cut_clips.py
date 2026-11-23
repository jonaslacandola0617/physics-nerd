"""Cut EP07 clips from the user's clean Top Gun: Maverick trim (movie 0:03:00-0:17:00, 1280x674 IMAX BluRay, AAC stereo).
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
SRC = {"tg": glob.glob(os.path.join(ROOT, "videos", 'clean/ep07-topgun.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep07", "clips")
W, H = 1100, 1080
ACTIVE = {'tg': (1280, 674, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"tg": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-breakup": [
        ('tg', 575.1, 575.7, 0.5),  # gauge: MACH 10.3,
        ('tg', 577.6, 580.7, 0.5),  # alarms, the jet breaks up
    ],
    "02-darkstar": [
        ('tg', 438.5, 442.5, 0.5),  # Darkstar at the edge of space,
        ('tg', 456.5, 457.5, 0.5),  # gauge 9.1,
        ('tg', 554.6, 555.6, 0.5),  # gauge 10.0,
        ('tg', 562.6, 564.0, 0.5),  # Maverick in the helmet
    ],
    "03-speed": [
        ('tg', 496.6, 498.6, 0.5),  # Darkstar over the horizon,
        ('tg', 510.6, 512.6, 0.5),  # climbing,
        ('tg', 518.6, 521.6, 0.5),  # alarms, heat,
        ('tg', 576.1, 577.6, 0.5),  # Maverick,
        ('tg', 577.6, 580.7, 0.5),  # breakup
    ],
    "04-streak": [
        ('tg', 590.6, 594.4, 0.5),  # fireball streaking across the dawn sky
    ],
    "05-suit": [
        ('tg', 504.6, 506.6, 0.5),  # pressure-suit helmet,
        ('tg', 512.6, 516.6, 0.5),  # pressure-suit helmet,
        ('tg', 548.6, 550.6, 0.5),  # helmet,
        ('tg', 576.6, 577.6, 0.5),  # helmet
    ],
    "06-diner": [
        ('tg', 620.2, 622.2, 0.5),  # diner regulars,
        ('tg', 625.2, 628.4, 0.5),  # Maverick drinks water,
        ('tg', 632.7, 634.4, 0.5),  # drinking,
        ('tg', 637.2, 645.0, 0.5),  # "Where am I?" / the kid
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
