"""Download ElevenLabs takes and produce word timings for take A.

Usage:
  python -I tools/fetch_vo.py <episode_dir> <ep_id> <urlA|fileA> [<urlB|fileB> ...]

Writes <episode_dir>/take-A.mp3, take-B.mp3, ..., <episode_dir>/take-A.words.json
and copies take A to studio/public/<ep_id>/vo.mp3 and studio/src/episodes/<ep_id>.words.json
"""
import json
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import wave
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from faster_whisper import WhisperModel

ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    ep_dir, ep_id, urls = Path(sys.argv[1]), sys.argv[2], sys.argv[3:]
    ep_dir.mkdir(parents=True, exist_ok=True)
    takes = []
    for i, url in enumerate(urls):
        out = ep_dir / f"take-{chr(65 + i)}.mp3"
        if Path(url).exists():  # local file (e.g. a Google Vids export downloaded from Drive)
            src = Path(url)
            if src.suffix.lower() == ".mp3":
                shutil.copy(src, out)
            else:  # wav/m4a/mp4 export -> mp3
                subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-y", "-i", str(src), "-vn",
                                "-c:a", "libmp3lame", "-b:a", "192k", str(out)], check=True)
        else:
            with urllib.request.urlopen(url) as r, open(out, "wb") as f:
                shutil.copyfileobj(r, f)
        takes.append(out)
        print("saved", out, out.stat().st_size, "bytes")

    ff = imageio_ffmpeg.get_ffmpeg_exe()
    with tempfile.TemporaryDirectory() as td:
        wav = Path(td) / "vo.wav"
        subprocess.run([ff, "-v", "error", "-y", "-i", str(takes[0]), "-ac", "1", "-ar", "16000", str(wav)], check=True)
        w = wave.open(str(wav))
        audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
        w.close()
    model = WhisperModel("small.en", device="cpu", compute_type="int8")
    segs, _ = model.transcribe(audio, word_timestamps=True)
    words = [{"w": x.word.strip(), "s": round(x.start, 2), "e": round(x.end, 2)} for s in segs for x in s.words]
    (ep_dir / "take-A.words.json").write_text(json.dumps(words, indent=0))

    pub = ROOT / "studio" / "public" / ep_id
    (pub / "clips").mkdir(parents=True, exist_ok=True)
    shutil.copy(takes[0], pub / "vo.mp3")
    shutil.copy(ep_dir / "take-A.words.json", ROOT / "studio" / "src" / "episodes" / f"{ep_id}.words.json")
    print(" ".join(f"{x['w']}@{x['s']}" for x in words))


if __name__ == "__main__":
    main()
