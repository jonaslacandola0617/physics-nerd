"""Cut EP04 clips from the user's trimmed Fast Five file (movie 1:43:00-2:05:00, 1920x816, AAC 5.1).
File time + 1:43:00 = movie time.
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
MOVIE = glob.glob(os.path.join(ROOT, "videos", 'fastfive/*.mp4'))[0]
OUT = os.path.join(ROOT, "studio", "public", 'ep04', "clips")
W, H = 1100, 1080
SRC_W, SRC_H = 1920, 816
MAXW = round(SRC_H * W / H / 2) * 2

# (start, end, cx, cy, w)  start/end = seconds into the user's trimmed file; cx/cy = crop centre (fraction)
CLIPS = {
    "01-open":          [(307.3, 308.4, 0.45, 0.5, MAXW),    # 1:48:07 vault dragged down the street
                         (309.1, 310.7, 0.45, 0.5, MAXW)],   # 1:48:09 vault swinging past a cop car
    "02-slide":         [(312.5, 314.4, 0.50, 0.5, MAXW),    # 1:48:12 aerial: vault dragged down the avenue
                         (307.3, 308.4, 0.45, 0.5, MAXW),    # 1:48:07 vault on the street
                         (309.1, 310.7, 0.45, 0.5, MAXW),    # 1:48:09 vault + cop car
                         (314.6, 315.4, 0.50, 0.5, MAXW),    # 1:48:14 vault head-on
                         (310.8, 312.4, 0.50, 0.5, MAXW),    # 1:48:10 sparks under the vault (no wheels)
                         (388.4, 389.9, 0.50, 0.5, MAXW),    # 1:49:28 aerial: vault sliding behind the cars
                         (383.3, 384.3, 0.50, 0.5, MAXW)],   # 1:49:23 both Chargers pulling
    "03-pull":          [(383.3, 389.9, 0.50, 0.5, MAXW)],   # 1:49:23 both Chargers, cables taut, aerial with vault
    "04-charger-front": [(490.8, 491.6, 0.50, 0.5, MAXW)],   # 1:51:10 Charger head-on
    "05-burnout":       [(470.4, 472.2, 0.50, 0.5, MAXW),    # 1:50:50 Charger rear, tyre smoke
                         (475.9, 477.2, 0.50, 0.5, MAXW)],   # 1:50:55 wheel spinning in smoke
    "06-reallife":      [(494.3, 496.1, 0.50, 0.5, MAXW),    # 1:51:14 bridge aerial
                         (491.9, 493.3, 0.50, 0.5, MAXW),    # 1:51:11 Dom gripping the wheel
                         (470.4, 472.2, 0.50, 0.5, MAXW),    # 1:50:50 burnout smoke
                         (475.9, 477.0, 0.50, 0.5, MAXW),    # 1:50:55 wheel spinning
                         (268.0, 271.0, 0.50, 0.5, MAXW)],   # 1:47:28 cops in pursuit
    "07-cop-hit":       [(511.0, 512.6, 0.50, 0.5, MAXW),    # 1:51:31 vault crushes a cop car
                         (514.4, 517.2, 0.50, 0.5, MAXW)],   # 1:51:34 vault slams another car
    "08-cop-flip":      [(522.9, 527.0, 0.50, 0.5, MAXW)],   # 1:51:43 cop car flipped into the bay
    "09-dom-end":       [(589.0, 597.5, 0.55, 0.5, MAXW)],   # 1:52:49 Dom on the bridge, Charger crashing behind
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
