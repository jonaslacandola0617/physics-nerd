@echo off
REM Physics Nerd: EP14 part b (Thor holding the star-forge iris).
cd /d "%~dp0"
if not exist clips_clean mkdir clips_clean
ffmpeg -hide_banner -loglevel error -y -ss 1:40:00 -to 1:50:00 -i "Avengers.Infinity.War.2018.REMASTERED.1080p.BluRay.x264.DD5.1-Pahe.in.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_clean\ep14-infinitywar-b.mkv" && echo Done: upload clips_clean\ep14-infinitywar-b.mkv
pause
