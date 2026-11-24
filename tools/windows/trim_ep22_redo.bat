@echo off
REM Physics Nerd EP16-25 (EP22 Matrix re-cut). Put this in the movies folder and double-click it.
REM Output goes to a "clips_s3" folder. All audio tracks are kept (Claude picks the English one).
cd /d "%~dp0"
if not exist clips_s3 mkdir clips_s3
set OK=0
set MISSING=0

call :cut "The.Matrix.1999.1080p.BluRay.AV1.DDP5.1.Multi4-dAV1nci.mkv" "ep22-matrix.mkv" 1:40:00 1:52:00

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
