@echo off
REM Physics Nerd EP26-35 (batch 2: Dark Knight + X-Men DoFP). Put this in the movies folder and double-click it.
REM Output goes to a "clips_s4" folder. All audio tracks are kept (Claude picks the English one).
cd /d "%~dp0"
if not exist clips_s4 mkdir clips_s4
set OK=0
set MISSING=0

call :cut "Batman.2.The.Dark.Knight.2008.1080p.BluRay.DTS.x264-CyTSuNee.mkv" "ep30-darkknight.mkv" 0:47:00 1:06:00
call :cut "X-Men__Days_of_Future_Past_&_40_2014&_41_.mp4" "ep34-xmen.mkv" 0:37:00 0:56:00

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
