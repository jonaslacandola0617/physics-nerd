@echo off
REM Physics Nerd EP16-25 (re-cut EP20 + EP24). Put this in the movies folder and double-click it.
REM Output goes to a "clips_s3" folder. All audio tracks are kept (Claude picks the English one).
cd /d "%~dp0"
if not exist clips_s3 mkdir clips_s3
set OK=0
set MISSING=0

call :cut "032.Interstellar.2014.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" "ep20-interstellar.mkv" 1:06:00 1:20:00
call :cut "Star.Wars.Episode.V.The.Empire.Strikes.Back.1980.REPACK.1080p.BluRay.AV1.DDP.5.1-dAV1nci.mkv" "ep24-empire.mkv" 0:38:00 0:52:00

echo.
echo Done: %OK% clips made, %MISSING% movies not found.
echo Upload everything in 'clips_s3' to the Videos folder on Drive.
pause
goto :eof

:cut
if not exist "%~1" (
  echo MISSING: "%~1"
  set /a MISSING+=1
  goto :eof
)
echo Cutting %~2 ...
ffmpeg -hide_banner -loglevel error -y -ss %3 -to %4 -i "%~1" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\%~2"
if errorlevel 1 (echo FAILED: %~2) else (set /a OK+=1)
goto :eof
