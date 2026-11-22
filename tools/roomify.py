"""Make the AI voiceover sound like it was recorded in a small room with a decent mic.

Chain: high-pass 90 Hz -> slight mid boost -> gentle compression -> small-room reverb (synthetic
impulse response, ~0.35 s decay, ~14% wet) -> faint room tone -> loudness to about -16 LUFS for the VO.
Reads episodes/<ep>/take-A.mp3 (stays dry/untouched), writes studio/public/<epNN>/vo.mp3.

Usage: python -I tools/roomify.py 01-interstellar-docking ep01 [05-jurassicpark-trex ep05 ...]
"""
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
import numpy as np

SR = 48000
ROOT = Path(__file__).resolve().parent.parent
FF = imageio_ffmpeg.get_ffmpeg_exe()
rng = np.random.default_rng(3)


def load(path):
    raw = subprocess.run([FF, "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)


def room_ir(decay=0.35, length=0.6):
    n = int(SR * length)
    t = np.arange(n) / SR
    tail = rng.standard_normal(n) * np.exp(-6.9 * t / decay)  # -60 dB at `decay`
    # darken the tail (walls absorb highs): one-pole low-pass
    a = np.exp(-2 * np.pi * 3500 / SR)
    for i in range(1, n):
        tail[i] = (1 - a) * tail[i] + a * tail[i - 1]
    ir = tail * 0.5
    for ms, g in [(7, 0.55), (11, 0.4), (17, 0.3), (23, 0.22), (31, 0.15)]:  # early reflections
        ir[int(SR * ms / 1000)] += g * rng.choice([-1, 1])
    ir[:int(SR * 0.004)] = 0  # pre-delay
    return ir / np.sqrt((ir ** 2).sum())


def convolve(x, h):
    n = len(x) + len(h) - 1
    m = 1 << (n - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(h, m), m)[:n]


def process(src, dst):
    dry = load(src)
    wet = convolve(dry, room_ir())[: len(dry) + int(SR * 0.4)]
    dry = np.pad(dry, (0, len(wet) - len(dry)))
    mix = dry + 0.14 * wet / (np.abs(wet).max() + 1e-9) * np.abs(dry).max()
    mix += rng.standard_normal(len(mix)) * 10 ** (-62 / 20)  # faint room tone, -62 dBFS
    dst.parent.mkdir(parents=True, exist_ok=True)
    af = ("highpass=f=90,equalizer=f=2500:t=q:w=1.2:g=2,"
          "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2,"
          "loudnorm=I=-16:TP=-1.5:LRA=7")
    subprocess.run([FF, "-v", "error", "-y", "-f", "f64le", "-ar", str(SR), "-ac", "1", "-i", "-",
                    "-af", af, "-ar", "44100", "-c:a", "libmp3lame", "-b:a", "192k", str(dst)],
                   input=mix.astype(np.float64).tobytes(), check=True)
    print("wrote", dst)


if __name__ == "__main__":
    args = sys.argv[1:]
    for ep_dir, ep_id in zip(args[::2], args[1::2]):
        d = ROOT / "episodes" / ep_dir
        src = d / "take-A.tight.wav" if (d / "take-A.tight.wav").exists() else d / "take-A.mp3"
        process(src, ROOT / "studio" / "public" / ep_id / "vo.mp3")
