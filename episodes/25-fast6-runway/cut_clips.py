"""Cut EP25 clips from the user's Fast & Furious 6 trim: a = movie 1:48:00-2:07:00 (720p 2.35 x264, AAC stereo). Very dark night footage: lifted gamma. Burned-in radio captions exist (e.g. 'Pull up, pull up!!' ~297 s): avoid those frames.
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
SRC = {"a": glob.glob(os.path.join(ROOT, "videos", 's3/ep25-fast6.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep25", "clips")
W, H = 1100, 1080
ACTIVE = {'a': (1280, 544, 0)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = "eq=gamma=1.2:brightness=0.02,"       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"a": ""}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-runway": [
        ('a', 189.2, 196.3, 0.5),  # cars racing under the plane at night
    ],
    "03-endless": [
        ('a', 156.2, 162.3, 0.5),  # runway at speed,
        ('a', 181.2, 185.3, 0.5),  # still on the runway,
        ('a', 199.2, 205.3, 0.5),  # still on the runway
    ],
    "04-lights": [
        ('a', 220.8, 222.4, 0.5),  # runway lights to the horizon
    ],
    "05-harpoon": [
        ('a', 205.3, 216.3, 0.45),  # harpoon guns fired into the plane,
        ('a', 228.3, 230.6, 0.5),  # car on the line
    ],
    "06-boom": [
        ('a', 393.4, 397.6, 0.5),  # the plane explodes
    ],
    "07-out": [
        ('a', 426.4, 432.6, 0.5),  # a car bursts out of the burning wreck
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
