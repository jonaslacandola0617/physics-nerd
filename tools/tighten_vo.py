"""Trim breaths/pauses in a voiceover take so it sounds fast and punchy, and keep word timings in sync.

Every silence longer than MIN_GAP is shortened to KEEP seconds (half kept at each edge).
Reads  episodes/<ep_dir>/take-A.mp3 + take-A.words.json (untouched originals)
Writes episodes/<ep_dir>/take-A.tight.wav, take-A.tight.words.json
       studio/src/episodes/<ep_id>.words.json   (re-timed, used by Remotion)
roomify.py picks up take-A.tight.wav automatically.

Usage: python -I tools/tighten_vo.py 05-jurassicpark-trex ep05 [--keep 0.22] [--min-gap 0.30]
"""
import argparse
import json
import subprocess
import wave
from pathlib import Path

import imageio_ffmpeg
import numpy as np

SR = 48000
ROOT = Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()


def load(path):
    raw = subprocess.run([FF, "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()


def silent_runs(x, thresh_db=-42.0, hop=0.01):
    n = int(SR * hop)
    frames = x[: len(x) // n * n].reshape(-1, n)
    db = 20 * np.log10(np.sqrt((frames ** 2).mean(axis=1)) + 1e-9) - 20 * np.log10(np.abs(x).max() + 1e-9)
    quiet = db < thresh_db
    runs, start = [], None
    for i, q in enumerate(np.append(quiet, False)):
        if q and start is None:
            start = i
        elif not q and start is not None:
            runs.append((start * hop, i * hop))
            start = None
    return runs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ep_dir")
    ap.add_argument("ep_id")
    ap.add_argument("--keep", type=float, default=0.22)
    ap.add_argument("--min-gap", type=float, default=0.30)
    a = ap.parse_args()
    d = ROOT / "episodes" / a.ep_dir
    x = load(d / "take-A.mp3")
    words = json.loads((d / "take-A.words.json").read_text())

    cuts = []  # (start, end) of audio removed, in original seconds
    for s, e in silent_runs(x):
        if e - s > a.min_gap and s > 0.05:  # leave leading silence alone at 0
            cuts.append((s + a.keep / 2, e - a.keep / 2))

    def remap(t):
        removed = 0.0
        for s, e in cuts:
            if t >= e:
                removed += e - s
            elif t > s:
                return s - removed
        return t - removed

    keep_mask = np.ones(len(x), bool)
    for s, e in cuts:
        keep_mask[int(s * SR):int(e * SR)] = False
    y = x[keep_mask]
    with wave.open(str(d / "take-A.tight.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())

    new_words = [{"w": w_["w"], "s": round(remap(w_["s"]), 2), "e": round(remap(w_["e"]), 2)} for w_ in words]
    js = json.dumps(new_words, indent=0)
    (d / "take-A.tight.words.json").write_text(js)
    (ROOT / "studio" / "src" / "episodes" / f"{a.ep_id}.words.json").write_text(js)

    print(f"{len(x) / SR:.2f}s -> {len(y) / SR:.2f}s ({len(cuts)} pauses trimmed)")
    # sentence-level segments for beat from/to: split where the (new) gap >= 0.15s
    seg = [new_words[0]]
    for p, q in zip(new_words, new_words[1:]):
        if q["s"] - p["e"] >= 0.15:
            print(f"  {seg[0]['s']:6.2f}-{seg[-1]['e']:6.2f}  {' '.join(w['w'] for w in seg)}")
            seg = []
        seg.append(q)
    print(f"  {seg[0]['s']:6.2f}-{seg[-1]['e']:6.2f}  {' '.join(w['w'] for w in seg)}")


if __name__ == "__main__":
    main()
