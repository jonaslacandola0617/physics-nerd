"""Cut EP09 clips from the user's clean John Wick: Chapter 4 trim (movie 0:28:00-0:50:00, 1280x536 BluRay, AAC stereo).
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
SRC = {"jw": glob.glob(os.path.join(ROOT, "videos", 'clean/ep09-johnwick.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep09", "clips")
W, H = 1100, 1080
ACTIVE = {'jw': (1280, 536, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"jw": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-shield": [
        ('jw', 827.3, 828.1, 0.45),  # jacket thrown up over his face,
        ('jw', 773.5, 775.3, 0.45),  # jacket raised as a shield
    ],
    "02-fight": [
        ('jw', 773.5, 777.4, 0.45),  # jacket up, advancing,
        ('jw', 805.5, 807.9, 0.5),  # brawl,
        ('jw', 826.2, 829.9, 0.45),  # jacket shield, rifles,
        ('jw', 700.8, 702.0, 0.5),  # Wick shooting
    ],
    "03-fight2": [
        ('jw', 660.7, 664.0, 0.5),  # fight,
        ('jw', 728.8, 732.0, 0.5),  # fight,
        ('jw', 752.8, 756.0, 0.5),  # fight
    ],
    "04-floor": [
        ('jw', 722.8, 726.8, 0.5),  # Wick down on the glass
    ],
    "05-rifles": [
        ('jw', 829.2, 831.8, 0.6),  # armored gunmen with rifles
    ],
    "06-drum": [
        ('jw', 692.8, 698.8, 0.5),  # drum fight,
        ('jw', 840.9, 843.0, 0.4),  # rifle,
        ('jw', 860.9, 862.0, 0.5),  # fight
    ],
    "07-calm": [
        ('jw', 933.0, 941.0, 0.5),  # Wick catches his breath
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
