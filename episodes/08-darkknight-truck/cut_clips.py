"""Cut EP08 clips from the user's trimmed Dark Knight file (H.264 1920x1080 SDR, English DTS 5.1).

File ep08-darkknight-chase.mkv starts at movie 1:12:00 in the user's copy (this copy's timeline runs
earlier than most: the truck flip is at ~1:21:25). Times are the file's own pts (full-decode sheets);
seeking uses -copyts + trim so they match exactly.
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
SRC = {"dk": glob.glob(os.path.join(ROOT, "videos", "darkknight", "ep08-darkknight-chase.mkv"))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep08", "clips")
W, H = 1100, 1080
SRC_W, SRC_H = 1920, 1080
MAXW = round(SRC_H * W / H / 2) * 2
TM = "null"  # SDR source
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"

# (file, start, end, cx)   cx = crop centre as a fraction of the width
CLIPS = {
    "01-chase":   [("dk", 541.0, 543.0, 0.50),   # Joker driving the semi
                   ("dk", 557.8, 558.4, 0.50),   # trailer wheels
                   ("dk", 543.5, 544.5, 0.50),   # Batpod down the street
                   ("dk", 556.0, 557.0, 0.50),   # truck from behind
                   ("dk", 545.9, 547.1, 0.45),   # Batpod
                   ("dk", 550.5, 551.4, 0.55),   # grapple launchers
                   ("dk", 552.3, 553.2, 0.50),   # Batpod alongside the truck
                   ("dk", 553.4, 554.1, 0.45),   # Batman
                   ("dk", 554.4, 554.95, 0.65),  # cable hits the truck's bumper (sparks)
                   ("dk", 555.0, 556.0, 0.45),   # Batpod pulls away
                   ("dk", 558.6, 561.6, 0.45)],  # Batpod weaves the cable around the lampposts
    "02-poles":   [("dk", 562.8, 564.3, 0.45),   # lampposts ripped out, cable taut on the bumper
                   ("dk", 564.8, 566.4, 0.62),   # the flip
                   ("dk", 566.5, 568.6, 0.50)],  # wide: truck upside down in the smoke
    "03-flip":    [("dk", 564.8, 566.4, 0.62),   # the flip
                   ("dk", 566.5, 571.0, 0.50),   # wide, smoke
                   ("dk", 580.0, 584.0, 0.40)],  # truck on its roof
    "04-joker":   [("dk", 587.0, 594.2, 0.40)],  # Joker crawls out, walks off with a gun
    "05-batpod":  [("dk", 571.3, 574.1, 0.50)],  # Batpod wall-bounce U-turn
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
