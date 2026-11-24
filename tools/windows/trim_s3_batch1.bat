@echo off
REM Physics Nerd EP16-25 (batch 1: 8 movies). Put this in the movies folder and double-click it.
REM Output goes to a "clips_s3" folder. All audio tracks are kept (Claude picks the English one).
cd /d "%~dp0"
if not exist clips_s3 mkdir clips_s3
set OK=0
set MISSING=0

if exist "Furious.7.2015.edition-Extended.1080p.BluRay.DDP.5.1.10bit.H.265-iVy.mkv" (
  echo Cutting ep16-furious7.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:18:00 -to 1:34:00 -i "Furious.7.2015.edition-Extended.1080p.BluRay.DDP.5.1.10bit.H.265-iVy.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep16-furious7.mkv" && set /a OK+=1
) else (
  echo MISSING: Furious.7.2015.edition-Extended.1080p.BluRay.DDP.5.1.10bit.H.265-iVy.mkv
  set /a MISSING+=1
)

if exist "Iron Man 2 2010 1080p 10bit BluRay 8CH X265 HEVC-PSA.mkv" (
  echo Cutting ep17-ironman2.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:24:00 -to 0:36:00 -i "Iron Man 2 2010 1080p 10bit BluRay 8CH X265 HEVC-PSA.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep17-ironman2.mkv" && set /a OK+=1
) else (
  echo MISSING: Iron Man 2 2010 1080p 10bit BluRay 8CH X265 HEVC-PSA.mkv
  set /a MISSING+=1
)

if exist "014.Inception.2010.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" (
  echo Cutting ep18-inception-a.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:18:00 -to 1:42:00 -i "014.Inception.2010.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep18-inception-a.mkv" && set /a OK+=1
) else (
  echo MISSING: 014.Inception.2010.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv
  set /a MISSING+=1
)

if exist "014.Inception.2010.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" (
  echo Cutting ep18-inception-b.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 2:03:00 -to 2:17:00 -i "014.Inception.2010.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep18-inception-b.mkv" && set /a OK+=1
) else (
  echo MISSING: 014.Inception.2010.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv
  set /a MISSING+=1
)

if exist "Pacific.Rim.2013.1080p.BluRay.AV1.Opus.5.1.[981].mkv" (
  echo Cutting ep19-pacificrim.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:13:00 -to 1:32:00 -i "Pacific.Rim.2013.1080p.BluRay.AV1.Opus.5.1.[981].mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep19-pacificrim.mkv" && set /a OK+=1
) else (
  echo MISSING: Pacific.Rim.2013.1080p.BluRay.AV1.Opus.5.1.[981].mkv
  set /a MISSING+=1
)

if exist "032.Interstellar.2014.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" (
  echo Cutting ep20-interstellar.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:53:00 -to 1:10:00 -i "032.Interstellar.2014.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep20-interstellar.mkv" && set /a OK+=1
) else (
  echo MISSING: 032.Interstellar.2014.BluRay.1080p.x265.10bit.2Audio.MNHD-FRDS.mkv
  set /a MISSING+=1
)

if exist "Indiana Jones and the Kingdom of the Crystal Skull (2008) 1080p 10bit Bluray x265 HEVC [Org DD 5.1 Hindi + DD 5.1 English] MSubs ~ TombDoc.mkv" (
  echo Cutting ep21-indy4.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:14:00 -to 0:26:00 -i "Indiana Jones and the Kingdom of the Crystal Skull (2008) 1080p 10bit Bluray x265 HEVC [Org DD 5.1 Hindi + DD 5.1 English] MSubs ~ TombDoc.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep21-indy4.mkv" && set /a OK+=1
) else (
  echo MISSING: Indiana Jones and the Kingdom of the Crystal Skull (2008) 1080p 10bit Bluray x265 HEVC [Org DD 5.1 Hindi + DD 5.1 English] MSubs ~ TombDoc.mkv
  set /a MISSING+=1
)

if exist "The.Matrix.1999.1080p.BluRay.AV1.DDP5.1.Multi4-dAV1nci.mkv" (
  echo Cutting ep22-matrix.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:50:00 -to 2:00:00 -i "The.Matrix.1999.1080p.BluRay.AV1.DDP5.1.Multi4-dAV1nci.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep22-matrix.mkv" && set /a OK+=1
) else (
  echo MISSING: The.Matrix.1999.1080p.BluRay.AV1.DDP5.1.Multi4-dAV1nci.mkv
  set /a MISSING+=1
)

if exist "Star.Wars.Episode.V.The.Empire.Strikes.Back.1980.REPACK.1080p.BluRay.AV1.DDP.5.1-dAV1nci.mkv" (
  echo Cutting ep24-empire.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:50:00 -to 1:04:00 -i "Star.Wars.Episode.V.The.Empire.Strikes.Back.1980.REPACK.1080p.BluRay.AV1.DDP.5.1-dAV1nci.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_s3\ep24-empire.mkv" && set /a OK+=1
) else (
  echo MISSING: Star.Wars.Episode.V.The.Empire.Strikes.Back.1980.REPACK.1080p.BluRay.AV1.DDP.5.1-dAV1nci.mkv
  set /a MISSING+=1
)

echo.
echo Done: %OK% clips made, %MISSING% movies not found.
echo Upload everything in 'clips_s3' to the Videos folder on Drive.
pause
