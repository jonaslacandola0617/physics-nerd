"""Move a timeline's voiceover cut points (from/to) onto a new take of the same script.

Each cut point sits just before a word of the old take. The script lines up the old and new word lists
(same script, so mostly the same words) and puts the cut just before the same word in the new take.

Usage: python -I tools/retime_vo.py ep16 old_words.json
Reads studio/src/episodes/<ep>.words.json (the new take) and rewrites studio/src/episodes/<ep>.ts.
"""
import difflib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
norm = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())


def main():
    ep, old_path = sys.argv[1], sys.argv[2]
    old = json.load(open(old_path))
    new = json.load(open(ROOT / "studio" / "src" / "episodes" / f"{ep}.words.json"))
    a, b = [norm(w["w"]) for w in old], [norm(w["w"]) for w in new]
    m = {}
    for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        for k in range(blk.size):
            m[blk.a + k] = blk.b + k

    def map_idx(i):
        for k in range(i, len(old)):  # the next old word that has a match in the new take
            if k in m:
                return m[k]
        return None

    def new_point(t):
        if t <= 0.01:
            return 0.0
        i = next((k for k, w in enumerate(old) if w["s"] >= t - 0.05), None)
        if i is None:  # the end of the voiceover
            return round(new[-1]["e"] + 0.25, 2)
        j = map_idx(i)
        if j is None:
            return round(new[-1]["e"] + 0.25, 2)
        prev_end = new[j - 1]["e"] if j > 0 else 0.0
        return round(max(prev_end + 0.02, min(new[j]["s"] - 0.12, (prev_end + new[j]["s"]) / 2)), 2)

    ts = ROOT / "studio" / "src" / "episodes" / f"{ep}.ts"
    src = ts.read_text()
    out = re.sub(r"from: ([\d.]+), to: ([\d.]+)",
                 lambda mm: f"from: {new_point(float(mm.group(1)))}, to: {new_point(float(mm.group(2)))}", src)
    ts.write_text(out)
    for x, y in zip(re.findall(r"from: [\d.]+, to: [\d.]+", src), re.findall(r"from: [\d.]+, to: [\d.]+", out)):
        print(f"  {x:28s} -> {y}")


if __name__ == "__main__":
    main()
