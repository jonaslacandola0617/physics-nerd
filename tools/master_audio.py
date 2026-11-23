"""Master a rendered episode's audio to YouTube loudness (-14 LUFS integrated, -1 dBTP true peak).

YouTube turns loud uploads down to about -14 LUFS but never turns quiet ones up, so a render at
-16.5 LUFS plays ~2.5 dB softer than other Shorts. Two-pass loudnorm (linear gain where possible),
video stream copied untouched. Overwrites the file in place.

Usage: python -I tools/master_audio.py renders/ep01.mp4 [renders/ep02.mp4 ...]
"""
import json
import os
import re
import subprocess
import sys

import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
TARGET = "I=-14:TP=-1:LRA=11"


def loudness(path):
    out = subprocess.run([FF, "-hide_banner", "-i", path, "-af", "ebur128=peak=true", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    summary = out[out.rfind("Summary:"):]
    return float(re.search(r"I:\s+(-?[\d.]+)", summary).group(1)), float(re.search(r"Peak:\s+(-?[\d.]+)", summary).group(1))


def master(path):
    before = loudness(path)
    out = subprocess.run([FF, "-hide_banner", "-i", path, "-af", f"loudnorm={TARGET}:print_format=json",
                          "-f", "null", "-"], capture_output=True, text=True).stderr
    m = json.loads(out[out.rfind("{"):out.rfind("}") + 1])
    af = (f"loudnorm={TARGET}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
          f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,"
          "aresample=48000")
    tmp = path + ".mastering.mp4"
    subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", "-i", path, "-map", "0:v", "-map", "0:a",
                    "-c:v", "copy", "-af", af, "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", tmp], check=True)
    os.replace(tmp, path)
    after = loudness(path)
    print(f"{path}: {before[0]:.1f} LUFS -> {after[0]:.1f} LUFS (true peak {after[1]:.1f} dBTP)")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        master(p)
