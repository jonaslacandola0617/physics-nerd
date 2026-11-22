"""Cut EP06 clips from the user's trimmed Iron Man file (movie 1:08:00-1:20:00, 1920x1016, HE-AAC 5.1).
File time + 1:08:00 = movie time.
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
MOVIE = glob.glob(os.path.join(ROOT, "videos", 'ironman/*.mkv'))[0]
OUT = os.path.join(ROOT, "studio", "public", 'ep06', "clips")
W, H = 1100, 1080
SRC_W, SRC_H = 1920, 1016
MAXW = round(SRC_H * W / H / 2) * 2

# (start, end, cx, cy, w)  start/end = seconds into the user's trimmed file; cx/cy = crop centre (fraction)
CLIPS = {
    "01-fly-tank":      [(628.6, 631.0, 0.50, 0.5, MAXW),    # 1:18:28 Iron Man flying low over the valley
                         (634.1, 638.4, 0.50, 0.5, MAXW),    # 1:18:34 hit mid-air, then the tank firing
                         (638.5, 639.4, 0.50, 0.5, MAXW)],   # 1:18:38 dust cloud
    "02-impact":        [(638.5, 644.4, 0.45, 0.5, MAXW)],   # 1:18:38 dust clears, Tony in the rubble
    "03-helmet":        [(643.0, 646.5, 0.62, 0.5, MAXW)],   # 1:18:43 helmet in the dirt, eyes light up
    "04-stand-missile": [(646.6, 655.0, 0.55, 0.5, MAXW)],   # 1:18:47 stands, walks, fires the wrist missile
    "05-walkaway":      [(654.9, 661.1, 0.62, 0.5, MAXW)],   # 1:18:55 walks away as the tank explodes
    "06-flyoff":        [(663.4, 667.7, 0.50, 0.5, MAXW)],   # 1:19:03 lifts off
    "07-landing":       [(563.4, 567.7, 0.50, 0.5, MAXW),    # 1:17:23 lands in Gulmira
                         (576.4, 577.7, 0.50, 0.5, MAXW)],   # 1:17:36 repulsor palm
}

PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"  # 5.1 / 5.1(side): FL FR FC LFE SL/BL SR/BR


def crop(cx, cy, w):
    h = round(w * H / W / 2) * 2
    x = min(max(0, round(cx * SRC_W - w / 2)), SRC_W - w)
    y = min(max(0, round(cy * SRC_H - h / 2)), SRC_H - h)
    return f"crop={w}:{h}:{x}:{y},scale={W}:{H}:flags=lanczos,setsar=1,fps=30"


def cut(name, segs):
    args, filt = [FF, "-hide_banner", "-loglevel", "error", "-y"], []
    for i, (s, e, cx, cy, w) in enumerate(segs):
        args += ["-ss", f"{s:.3f}", "-t", f"{e - s:.3f}", "-i", MOVIE]
        filt.append(f"[{i}:v:0]{crop(cx, cy, w)},format=yuv420p[v{i}];[{i}:a:0]{PAN},aresample=48000[a{i}]")
    n = len(segs)
    filt.append("".join(f"[v{i}][a{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=1[v][a]")
    out = os.path.join(OUT, name + ".mp4")
    args += ["-filter_complex", ";".join(filt), "-map", "[v]", "-map", "[a]",
             "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out]
    subprocess.run(args, check=True)
    print(name, round(sum(e - s for s, e, *_ in segs), 2), "s", flush=True)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    only = set(sys.argv[1:])
    for k, v in CLIPS.items():
        if not only or k in only:
            cut(k, v)
