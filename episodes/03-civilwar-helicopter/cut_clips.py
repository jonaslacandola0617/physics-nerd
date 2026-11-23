"""Cut EP03 clips from the user's clean Civil War trim (movie 1:00:00-1:15:00, 1728x720 BluRay, AAC stereo).
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
SRC = {"cw": glob.glob(os.path.join(ROOT, "videos", 'clean/ep03-civilwar.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep03", "clips")
W, H = 1100, 1080
ACTIVE = {'cw': (1728, 720, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"cw": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-grab": [
        ('cw', 543.6, 546.4, 0.5),  # Cap grabs the skid from the pad
    ],
    "02-heli": [
        ('cw', 528.6, 531.1, 0.5),  # helicopter on the rooftop pad,
        ('cw', 531.6, 534.0, 0.5),  # Bucky starts it,
        ('cw', 541.6, 543.0, 0.5),  # lifting off,
        ('cw', 543.6, 549.6, 0.5),  # Cap pulling the skid down,
        ('cw', 550.1, 551.6, 0.5),  # aerial
    ],
    "03-hold": [
        ('cw', 552.1, 553.1, 0.5),  # stretched between skid and pad,
        ('cw', 554.6, 556.4, 0.5),  # low angle,
        ('cw', 556.6, 565.0, 0.5),  # one hand on the skid, one on the yellow railing
    ],
    "04-railing": [
        ('cw', 554.6, 556.4, 0.5),  # low angle,
        ('cw', 556.6, 558.6, 0.5),  # gripping the railing
    ],
    "05-pull": [
        ('cw', 568.1, 571.0, 0.5),  # helicopter dragged down
    ],
    "06-crash": [
        ('cw', 575.6, 579.5, 0.5),  # crash onto the roof
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
