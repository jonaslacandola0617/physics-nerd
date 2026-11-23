"""Cut EP10 clips from the user's trimmed Ant-Man files (HDR10 HEVC 1920x1038, AC3 5.1).

Files (movie time = file time + offset): shrink 0:28:00, training 0:55:00, finale 1:35:00.
Times below are the files' own pts (from full-decode contact sheets). Seeking uses -copyts + trim,
so they match exactly. HDR is tone-mapped to SDR (hable).
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
SRC = {k: glob.glob(os.path.join(ROOT, "videos", "antman", f"ep10-antman-{k}.mkv"))[0] for k in ("shrink", "training")}
OUT = os.path.join(ROOT, "studio", "public", "ep10", "clips")
W, H = 1100, 1080
SRC_W, SRC_H = 1920, 1038
MAXW = round(SRC_H * W / H / 2) * 2
TM = ("zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,"
      "zscale=t=bt709:m=bt709:r=tv")
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"

# (file, start, end, cx)   cx = crop centre as a fraction of the width
CLIPS = {
    "01-ride-close":  [("training", 428.8, 432.8, 0.50)],   # 1:02:09 Scott on the flying ant, wings beating
    "02-ride-helmet": [("training", 454.8, 461.4, 0.50)],   # 1:02:35 Scott riding, sky behind
    "03-hank":        [("shrink", 841.2, 843.3, 0.40),      # 0:42:01 Hank
                       ("shrink", 862.3, 864.6, 0.40),      # 0:42:22 Hank and Scott
                       ("shrink", 874.3, 879.3, 0.50)],     # 0:42:34 "change the distance between atoms"
    "04-sugar":       [("shrink", 815.7, 817.6, 0.55),      # 0:41:36 sugar cubes by the teacup
                       ("shrink", 819.8, 822.3, 0.55),
                       ("training", 439.2, 441.7, 0.55)],   # 1:02:19 flying ants in formation
    "05-ride-night":  [("shrink", 610.0, 612.5, 0.50),      # 0:38:10 flying ant past a car at night
                       ("shrink", 613.0, 615.0, 0.50)],     # 0:38:13 ant in the wing mirror
    "06-punch":       [("training", 553.3, 554.3, 0.50),    # 1:04:13 Falcon
                       ("training", 555.4, 556.4, 0.50),
                       ("training", 563.9, 565.5, 0.50),    # 1:04:24 tiny Scott hits Falcon
                       ("training", 567.4, 571.9, 0.50),    # 1:04:27 punch, Falcon flips
                       ("training", 574.4, 576.0, 0.50)],   # 1:04:34 Falcon on the ground
    "07-ride-sky":    [("training", 433.8, 435.4, 0.50),    # 1:02:14 POV on the ant
                       ("training", 445.3, 446.9, 0.50)],   # 1:02:25 over the Avengers facility
}


def cut(name, segs):
    args, filt = [FF, "-hide_banner", "-loglevel", "error", "-y"], []
    for i, (src, s, e, cx) in enumerate(segs):
        args += ["-ss", f"{max(0, s - 12):.3f}", "-copyts", "-i", SRC[src]]
        x = min(max(0, round(cx * SRC_W - MAXW / 2)), SRC_W - MAXW)
        filt.append(f"[{i}:v:0]trim=start={s}:end={e},setpts=PTS-STARTPTS,crop={MAXW}:{SRC_H}:{x}:0,"
                    f"{TM},scale={W}:{H}:flags=lanczos,setsar=1,fps=30,format=yuv420p[v{i}];"
                    f"[{i}:a:0]atrim=start={s}:end={e},asetpts=PTS-STARTPTS,{PAN},aresample=48000[a{i}]")
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
