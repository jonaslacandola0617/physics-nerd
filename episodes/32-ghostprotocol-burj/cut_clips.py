"""Cut EP32 clips from the user's Ghost Protocol trim: a = movie 0:53:00-1:14:00 (1728x720 2.40, AAC stereo English). No sandstorm in this window (it comes later in the film).
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's4/ep32-ghostprotocol.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep32", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1728, 720, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-slap": [
        ('a', 316.4, 318.5, 0.5),  # glowing blue glove,
        ('a', 324.4, 332.0, 0.5),  # Ethan slaps the gloves on the glass and climbs
    ],
    "02-hang": [
        ('a', 334.4, 338.5, 0.5),  # tiny Ethan on the glass facade
    ],
    "03-climb": [
        ('a', 324.4, 332.4, 0.5),  # climbing with the gloves,
        ('a', 334.4, 346.4, 0.5),  # wide: a speck on the Burj,
        ('a', 348.4, 356.4, 0.5),  # hand over hand
    ],
    "04-desert": [
        ('a', 0.2, 6.0, 0.5),  # the Dubai desert,
        ('a', 186.3, 196.3, 0.5),  # Dubai from the top
    ],
    "05-glove": [
        ('a', 404.5, 416.0, 0.5),  # one glove dead, hanging one-handed,
        ('a', 418.6, 422.6, 0.5),  # swinging out
    ],
    "06-swing": [
        ('a', 512.6, 516.6, 0.5),  # rope swing out,
        ('a', 548.7, 552.7, 0.5),  # swinging back,
        ('a', 566.7, 572.7, 0.5),  # pulled in through the window
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
