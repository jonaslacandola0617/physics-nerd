"""Cut EP11 clips from the user's trimmed The Avengers (2012) file (movie 1:58:00-2:10:00, 1080p WEB, EAC3 5.1 English = a:0).
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
SRC = {"av": glob.glob(os.path.join(ROOT, "videos", 's3/ep11-avengers.mkv'))[0]}
OUT = os.path.join(ROOT, "studio", "public", "ep11", "clips")
W, H = 1100, 1080
ACTIVE = {'av': (1920, 1040, 20)}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = ""       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {"av": PAN}         # per source: audio filter ("" = already stereo)

CLIPS = {
    "01-grab": [
        ('av', 434.9, 436.6, 0.5),  # Iron Man flies up under the missile and grabs it,
        ('av', 476.9, 477.8, 0.5),  # hanging under the missile through the city
    ],
    "02-missile": [
        ('av', 361.0, 363.6, 0.5),  # jet fires the nuke,
        ('av', 366.0, 368.6, 0.5),  # missile over the water,
        ('av', 423.0, 426.0, 0.5),  # Iron Man racing to intercept,
        ('av', 432.9, 434.4, 0.5),  # missile streaking in,
        ('av', 434.9, 436.6, 0.5),  # the grab,
        ('av', 476.9, 477.8, 0.5),  # under the missile
    ],
    "03-up": [
        ('av', 482.4, 484.3, 0.5),  # pushing it straight up the tower, fins static,
        ('av', 488.9, 490.3, 0.5),  # vertical into the portal beam
    ],
    "04-fall": [
        ('av', 569.4, 570.5, 0.5),  # Tony falls out of the portal,
        ('av', 574.0, 577.4, 0.5),  # falling over Manhattan,
        ('av', 581.5, 586.4, 0.5),  # Hulk leaps, catches him, slides down the building
    ],
    "05-wake": [
        ('av', 624.5, 626.6, 0.55),  # Hulk roars in his face,
        ('av', 627.1, 633.2, 0.45),  # Tony wakes up
    ],
    "06-nuke": [
        ('av', 523.9, 527.4, 0.5),  # the nuke detonates in space
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
