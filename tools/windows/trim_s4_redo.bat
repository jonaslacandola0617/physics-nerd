@echo off
REM Physics Nerd EP26-35 (re-cuts: Speed, Ultron lift, F9 launch). Put this in the movies folder and double-click it.
REM Output goes to a "clips_s4" folder. All audio tracks are kept (Claude picks the English one).
cd /d "%~dp0"
if not exist clips_s4 mkdir clips_s4
set OK=0
set MISSING=0

call :cut "Speed.1994.1080p.BluRay.x264-OFT.mkv" "ep26-speed.mkv" 1:00:00 1:12:00
call :cut "Avengers.Age.of.Ultron.2015.1080p.BluRay.x265-RARBG.mp4" "ep27-ultron-lift.mkv" 1:34:00 1:47:00
call :cut "Fast.and.Furious.F9.The.Fast.Saga.2021.DC.1080p.BluRay.x264.DTS.mp4" "ep29-f9-launch.mkv" 1:48:00 1:59:00

echo.
echo Done: %OK% clips made, %MISSING% movies not found.
echo Upload everything in 'clips_s4' to a new Drive folder and send Claude the link.
pause
goto :eof

:cut
if not exist "%~1" (
  echo MISSING: "%~1"
  set /a MISSING+=1
  goto :eof
)
echo Cutting %~2 ...
ffmpeg -hide_banner -loglevel error -y -ss %3 -to %4 -i "%~1" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s4\%~2"
if errorlevel 1 (echo FAILED: %~2) else (set /a OK+=1)
goto :eof
