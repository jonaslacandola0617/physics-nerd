"""Make sure no beat boundary cuts off a word in the voiceover.

Whisper's word end times are early: the tail of a word ("movie", "fifty") is still
sounding after its `e`. A beat whose `to:` sits on that timestamp hard-cuts the tail,
and the next thing heard is a pause click, a gap, or movie audio.

This script measures the real audio of studio/public/<ep>/vo.mp3 at every hard cut
(any vo/pause edge that is not a seamless vo->vo continuation) and checks that the
voice is silent there. With --fix it moves each bad cut to the nearest silence that
stays between the same two words, and rewrites the numbers in src/episodes/<ep>.ts.

Usage: python -I tools/check_vo_cuts.py ep01 ep02 ...      (exit 1 if any cut is bad)
       python -I tools/check_vo_cuts.py ep02 --fix
Run it before every render (RENDER.md step 3).
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
STUDIO = ROOT / "studio"
SR = 16000
HOP = 0.01          # RMS window step, seconds
WIN = 0.02          # RMS window length
GUARD = 0.05        # audio must be silent this long on each side of a cut
MARGIN = 0.04       # after the tail dies, leave this much extra before cutting
ABOVE_FLOOR_DB = 14 # "silent" = within this many dB of the take's room-tone floor


def ffmpeg():
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def rms_db(path):
    raw = subprocess.run([ffmpeg(), "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32)
    hop, win = int(HOP * SR), int(WIN * SR)
    n = max(1, (len(x) - win) // hop)
    frames = np.lib.stride_tricks.sliding_window_view(x, win)[::hop][:n]
    db = 20 * np.log10(np.sqrt((frames.astype(np.float64) ** 2).mean(axis=1)) + 1e-9)
    return db, len(x) / SR


def parse_beats(src):
    """Return beats in order: kind, and for vo/pause the from/to values with their text positions."""
    starts = [m for m in re.finditer(r"kind:\s*'(play|pause|vo|movie)'", src)]
    beats = []
    for i, m in enumerate(starts):
        end = starts[i + 1].start() if i + 1 < len(starts) else len(src)
        seg_start = m.start()
        b = {"kind": m.group(1)}
        if b["kind"] in ("vo", "pause"):
            f = re.compile(r"from:\s*([\d.]+)").search(src, seg_start, end)
            t = re.compile(r"to:\s*([\d.]+)").search(src, seg_start, end)
            b.update(frm=float(f.group(1)), frm_span=f.span(1), to=float(t.group(1)), to_span=t.span(1))
        beats.append(b)
    return beats


class Audio:
    def __init__(self, path):
        self.db, self.dur = rms_db(path)
        self.thr = float(np.percentile(self.db, 10)) + ABOVE_FLOOR_DB

    def loud(self, a, b):
        """Peak level between a and b seconds."""
        i, j = max(0, int(a / HOP)), min(len(self.db), int(np.ceil(b / HOP)) + 1)
        return float(self.db[i:j].max()) if j > i else -120.0

    def silent_at(self, t):
        return self.loud(t - GUARD, t + GUARD) < self.thr


def best_cut(audio, b, lo, hi):
    """Nearest silent point to b inside [lo, hi]. Prefers moving later (tails run late).
    Falls back to the quietest point in range."""
    if audio.silent_at(b):
        return b, True
    steps = np.arange(0, max(hi - lo, 0) + HOP, HOP)
    for d in steps:
        for t in (b + d, b - d):
            if lo <= t <= hi and audio.silent_at(t):
                # if we moved later, the tail just died: leave a little extra air
                if t > b:
                    t = min(t + MARGIN, hi)
                return round(t, 2), True
    grid = np.arange(lo, hi + HOP, HOP)
    if len(grid) == 0:
        return b, False
    t = min(grid, key=lambda g: audio.loud(g - GUARD, g + GUARD))
    return round(float(t), 2), False


def check(ep, fix):
    ts_path = STUDIO / "src" / "episodes" / f"{ep}.ts"
    src = ts_path.read_text()
    words = json.loads((STUDIO / "src" / "episodes" / f"{ep}.words.json").read_text())
    vo = re.search(r"voiceover:\s*'([^']+)'", src).group(1)
    audio = Audio(STUDIO / "public" / vo)
    beats = parse_beats(src)

    # every hard cut: (time, list of (beat index, 'frm'|'to')) sharing that time
    cuts = {}
    for i, b in enumerate(beats):
        if b["kind"] not in ("vo", "pause"):
            continue
        prev = beats[i - 1] if i > 0 else None
        nxt = beats[i + 1] if i + 1 < len(beats) else None
        seamless_in = prev and prev["kind"] == "vo" and b["kind"] == "vo" and abs(prev["to"] - b["frm"]) < 1e-6
        seamless_out = nxt and nxt["kind"] == "vo" and b["kind"] == "vo" and abs(nxt["frm"] - b["to"]) < 1e-6
        if not seamless_in:
            cuts.setdefault(b["frm"], []).append((i, "frm"))
        if not seamless_out:
            cuts.setdefault(b["to"], []).append((i, "to"))

    bad, edits = 0, []
    for t, refs in sorted(cuts.items()):
        if t == 0:
            continue
        before = [w for w in words if w["s"] < t - 0.05]
        after = [w for w in words if w["s"] >= t - 0.05]
        lo = before[-1]["e"] if before else 0.0
        hi = (after[0]["s"] - 0.03) if after else audio.dur - GUARD
        ok = audio.silent_at(t)
        level = audio.loud(t - GUARD, t + GUARD)
        last = before[-1]["w"] if before else "(start)"
        nxtw = after[0]["w"] if after else "(end)"
        if ok:
            continue
        bad += 1
        new, clean = best_cut(audio, t, lo, hi)
        where = ", ".join(f"beat {i + 1} {'from' if k == 'frm' else 'to'}" for i, k in refs)
        msg = f"  CUT {t:6.2f}s  ({where})  voice at {level:.0f} dB between \"{last}\" and \"{nxtw}\""
        msg += f"  -> move to {new:.2f}s" + ("" if clean else "  (no true silence; quietest point)")
        print(msg)
        for i, k in refs:
            edits.append((beats[i][f"{k}_span"], f"{new:.2f}"))

    if fix and edits:
        for (a, b), val in sorted(edits, key=lambda e: e[0][0], reverse=True):
            src = src[:a] + val + src[b:]
        ts_path.write_text(src)
        print(f"  fixed {len(edits)} value(s) in {ts_path.relative_to(ROOT)}")
    print(f"{ep}: {len(cuts)} hard cuts checked, {bad} cutting into the voice"
          f" (silence threshold {audio.thr:.0f} dB)")
    return bad


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("eps", nargs="+")
    ap.add_argument("--fix", action="store_true")
    args = ap.parse_args()
    total = 0
    for ep in args.eps:
        bad = check(ep, args.fix)
        if args.fix and bad:
            bad = check(ep, False)
        total += bad
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
