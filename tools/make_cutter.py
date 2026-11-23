"""Write an episode's cut_clips.py from a compact spec (shared by EP11+).

Times are the source file's own pts (from full-decode `select` contact sheets); the generated cutter
seeks with -copyts + trim so they match exactly. Crops the active picture (letterbox removed) to 1100x1080.
"""
TEMPLATE = '''"""{doc}
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
SRC = {srcs}
OUT = os.path.join(ROOT, "studio", "public", "{ep}", "clips")
W, H = 1100, 1080
ACTIVE = {active}   # per source: (width, height, y offset) of the picture inside any letterbox
PRE = "{pre}"       # extra filters before scaling (tone-map / sharpen)
PAN = "pan=stereo|c0=0.8*c2+0.6*c0+0.4*c4+0.3*c3|c1=0.8*c2+0.6*c1+0.4*c5+0.3*c3"
AUD = {aud}         # per source: audio filter ("" = already stereo)

CLIPS = {{
{clips}}}


def cut(name, segs):
    args, filt = [FF, "-hide_banner", "-loglevel", "error", "-y"], []
    for i, (src, s, e, cx) in enumerate(segs):
        sw, sh, sy = ACTIVE[src]
        cw = min(sw, round(sh * W / H / 2) * 2)
        x = min(max(0, round(cx * sw - cw / 2)), sw - cw)
        args += ["-ss", f"{{max(0, s - 12):.3f}}", "-copyts", "-i", SRC[src]]
        af = AUD[src] or "anull"
        filt.append(f"[{{i}}:v:0]trim=start={{s}}:end={{e}},setpts=PTS-STARTPTS,crop={{cw}}:{{sh}}:{{x}}:{{sy}},{{PRE}}"
                    f"scale={{W}}:{{H}}:flags=lanczos,setsar=1,fps=30,format=yuv420p[v{{i}}];"
                    f"[{{i}}:a:0]atrim=start={{s}}:end={{e}},asetpts=PTS-STARTPTS,{{af}},aresample=48000[a{{i}}]")
    n = len(segs)
    filt.append("".join(f"[v{{i}}][a{{i}}]" for i in range(n)) + f"concat=n={{n}}:v=1:a=1[v][a]")
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
'''


def write(path, doc, ep, srcs, active, clips, pre="", aud=None):
    src_code = "{" + ", ".join(f'"{k}": glob.glob(os.path.join(ROOT, "videos", {v!r}))[0]' for k, v in srcs.items()) + "}"
    aud = aud or {k: "PAN" for k in srcs}
    aud_code = "{" + ", ".join(f'"{k}": {v}' for k, v in aud.items()) + "}"
    lines = ""
    for name, segs in clips.items():
        body = ",\n".join(f'        ({s!r}, {a}, {b}, {cx}),  # {c}' for s, a, b, cx, c in segs)
        lines += f'    "{name}": [\n{body}\n    ],\n'
    open(path, "w").write(TEMPLATE.format(doc=doc, srcs=src_code, ep=ep, active=active, pre=pre, aud=aud_code, clips=lines))
