@echo off
REM Physics Nerd EP16-25 (batch 1: 8 movies). Put this in the movies folder and double-click it.
REM Output goes to a "clips_s3" folder. All audio tracks are kept (Claude picks the English one).
cd /d "%~dp0"
if not exist clips_s3 mkdir clips_s3
set OK=0
set MISSING=0

call :cut "Furious.7.2015.edition-Extended.1080p.BluRay.DDP.5.1.10bit.H.265-iVy.mkv" "ep16-furious7.mkv" 1:18:00 1:34:00
call :cut "Iron Man 2 2010 1080p 10bit BluRay 8CH X265 HEVC-PSA.mkv" "ep17-ironman2.mkv" 0:24:00 0:36:00
call :cut "014.Inception.2010.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" "ep18-inception-a.mkv" 1:18:00 1:42:00
call :cut "014.Inception.2010.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" "ep18-inception-b.mkv" 2:03:00 2:17:00
call :cut "Pacific.Rim.2013.1080p.BluRay.AV1.Opus.5.1.[981].mkv" "ep19-pacificrim.mkv" 1:13:00 1:32:00
call :cut "032.Interstellar.2014.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" "ep20-interstellar.mkv" 0:53:00 1:10:00
call :cut "Indiana Jones and the Kingdom of the Crystal Skull (2008) 1080p 10bit Bluray x265 HEVC [Org DD 5.1 Hindi + DD 5.1 English] MSubs ~ TombDoc.mkv" "ep21-indy4.mkv" 0:14:00 0:26:00
call :cut "The.Matrix.1999.1080p.BluRay.AV1.DDP5.1.Multi4-dAV1nci.mkv" "ep22-matrix.mkv" 1:50:00 2:00:00
call :cut "Star.Wars.Episode.V.The.Empire.Strikes.Back.1980.REPACK.1080p.BluRay.AV1.DDP.5.1-dAV1nci.mkv" "ep24-empire.mkv" 0:50:00 1:04:00

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
