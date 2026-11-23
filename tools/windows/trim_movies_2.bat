@echo off
REM Physics Nerd: second batch of scene windows (missing parts of EP03, EP14, EP15).
REM Put this file in the same folder as the movies and double-click it. Output goes to the 'clips' folder.
cd /d "%~dp0"
if not exist clips mkdir clips
set OK=0
set MISSING=0

if exist "Captain.America.Civil.War.2016.REMASTERED.720p.BluRay.x264-ESub.Hollymoviehd.mp4" (
  echo Cutting ep03-civilwar-b.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:04:00 -to 1:15:00 -i "Captain.America.Civil.War.2016.REMASTERED.720p.BluRay.x264-ESub.Hollymoviehd.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep03-civilwar-b.mkv" && set /a OK+=1
) else (
  echo MISSING: Captain.America.Civil.War.2016.REMASTERED.720p.BluRay.x264-ESub.Hollymoviehd.mp4
  set /a MISSING+=1
)

if exist "Avengers.Infinity.War.2018.720p.BluRay.x264-ESub.Hollymoviehd.mp4" (
  echo Cutting ep14-infinitywar-b.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:22:00 -to 1:35:00 -i "Avengers.Infinity.War.2018.720p.BluRay.x264-ESub.Hollymoviehd.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep14-infinitywar-b.mkv" && set /a OK+=1
) else (
  echo MISSING: Avengers.Infinity.War.2018.720p.BluRay.x264-ESub.Hollymoviehd.mp4
  set /a MISSING+=1
)

if exist "Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv" (
  echo Cutting ep15-godzilla-b.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:14:00 -to 1:29:00 -i "Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep15-godzilla-b.mkv" && set /a OK+=1
) else (
  echo MISSING: Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv
  set /a MISSING+=1
)

echo.
echo Done: %OK% clips made, %MISSING% movies not found.
echo Upload the new files in 'clips' (ep03-civilwar-b, ep14-infinitywar-b, ep15-godzilla-b) to the videos folder.
pause
