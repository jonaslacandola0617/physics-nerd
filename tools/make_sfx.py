"""Synthesize the channel's sound effects (no third-party samples = no licensing issues).

Writes studio/public/sfx/{click,resume,pop,whoosh,boom,ding}.wav at 48 kHz mono.
Run:  python -I tools/make_sfx.py
"""
import wave
from pathlib import Path

import numpy as np

SR = 48000
OUT = Path(__file__).resolve().parent.parent / "studio" / "public" / "sfx"
rng = np.random.default_rng(7)


def t(sec):
    return np.arange(int(SR * sec)) / SR


def env(n, attack, decay):
    x = np.arange(n) / SR
    return np.minimum(1, x / max(attack, 1e-4)) * np.exp(-x / decay)


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.zeros_like(x)
    for i in range(1, len(x)):
        y[i] = (1 - a) * x[i] + a * y[i - 1]
    return y


def highpass(x, cutoff):
    return x - lowpass(x, cutoff)


def save(name, x, peak=0.9):
    x = x / (np.abs(x).max() + 1e-9) * peak
    OUT.mkdir(parents=True, exist_ok=True)
    with wave.open(str(OUT / f"{name}.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())
    print("wrote", name, f"{len(x) / SR:.2f}s")


def keyclick(tone_hz):
    # spacebar: plastic tick (bright noise burst) + small body thump + a second softer tick (key release)
    n = int(SR * 0.09)
    tick = highpass(rng.standard_normal(n), 2500) * env(n, 0.0005, 0.004)
    body = np.sin(2 * np.pi * tone_hz * t(0.09)) * env(n, 0.001, 0.012) * 0.6
    rel = np.zeros(n)
    k = int(SR * 0.045)
    rel[k:] = (highpass(rng.standard_normal(n - k), 3000) * env(n - k, 0.0005, 0.003)) * 0.35
    return tick + body + rel


def pop():
    x = t(0.14)
    f = 900 * np.exp(-x * 18) + 220
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(len(x), 0.002, 0.045)


def whoosh():
    x = t(0.45)
    noise = rng.standard_normal(len(x))
    sweep = np.zeros_like(noise)
    # moving band: crude by blending two filters with time-varying weights
    lo, hi = lowpass(noise, 600), lowpass(noise, 3500)
    w = np.sin(np.pi * x / x[-1])
    sweep = lo * (1 - w) + hi * w
    return sweep * np.sin(np.pi * x / x[-1]) ** 2


def boom():
    x = t(1.0)
    f = 70 * np.exp(-x * 2.5) + 38
    ph = 2 * np.pi * np.cumsum(f) / SR
    sub = np.sin(ph) * env(len(x), 0.004, 0.35)
    thump = lowpass(rng.standard_normal(len(x)), 200) * env(len(x), 0.001, 0.05) * 2
    return sub + thump


def ding():
    x = t(0.8)
    return (np.sin(2 * np.pi * 1320 * x) + 0.4 * np.sin(2 * np.pi * 2640 * x)) * env(len(x), 0.002, 0.25)


if __name__ == "__main__":
    save("click", keyclick(180), 0.8)
    save("resume", keyclick(220), 0.7)
    save("pop", pop(), 0.6)
    save("whoosh", whoosh(), 0.55)
    save("boom", boom(), 0.9)
    save("ding", ding(), 0.5)
