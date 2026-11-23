"""Cut EP13 clips from the user's clean MI: Rogue Nation trim (movie 0:00:00-0:08:00, 1280x536 BluRay, AAC stereo).
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
SRC = {"mi": glob.glob(os.path.join(ROOT, "videos", 'clean/ep13-mi.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep13", "clips")
W, H = 1100, 1080
ACTIVE = {'mi': (1280, 536, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"mi": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-takeoff": [
        ('mi', 235.2, 239.0, 0.35),  # hanging on the door down the runway
    ],
    "02-hang": [
        ('mi', 229.2, 231.0, 0.35),  # on the door,
        ('mi', 235.2, 239.0, 0.35),  # runway rushing past,
        ('mi', 240.2, 243.0, 0.35),  # lifting off
    ],
    "03-run": [
        ('mi', 194.2, 195.2, 0.5),  # Ethan sprints,
        ('mi', 202.2, 208.0, 0.5),  # onto the wing,
        ('mi', 216.2, 218.6, 0.5),  # A400M rolling,
        ('mi', 243.0, 248.4, 0.35),  # airborne, ground falling away
    ],
    "05-airborne": [
        ('mi', 253.2, 255.0, 0.5),  # aerial: the A400M climbing,
        ('mi', 255.2, 258.2, 0.4),  # hanging over the fields,
        ('mi', 264.2, 266.8, 0.4),  # high above,
        ('mi', 267.2, 268.8, 0.5),  # face and hair in the wind
    ],
    "06-inside": [
        ('mi', 286.2, 291.0, 0.5),  # tumbles inside
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
