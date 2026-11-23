@echo off
REM Physics Nerd: scene windows from the clean (no burned-in subtitles) copies.
REM Put this file in the same folder as the movies and double-click it. Output goes to a 'clips_clean' folder.
cd /d "%~dp0"
if not exist clips_clean mkdir clips_clean
set OK=0
set MISSING=0

if exist "Captain_America_Civil_War_2016_1080p_Blu_Ray_x264_[YTS_AG].mp4" (
  echo Cutting ep03-civilwar.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:00:00 -to 1:15:00 -i "Captain_America_Civil_War_2016_1080p_Blu_Ray_x264_[YTS_AG].mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_clean\ep03-civilwar.mkv" && set /a OK+=1
) else (
  echo MISSING: Captain_America_Civil_War_2016_1080p_Blu_Ray_x264_[YTS_AG].mp4
  set /a MISSING+=1
)

if exist "Top.Gun.Maverick.2022.720p.BluRay.x264.AAC-_YTS.MX.mp4" (
  echo Cutting ep07-topgun.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:03:00 -to 0:17:00 -i "Top.Gun.Maverick.2022.720p.BluRay.x264.AAC-_YTS.MX.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_clean\ep07-topgun.mkv" && set /a OK+=1
) else (
  echo MISSING: Top.Gun.Maverick.2022.720p.BluRay.x264.AAC-_YTS.MX.mp4
  set /a MISSING+=1
)

if exist "John.Wick.Chapter.4.2023.720p.BluRay.x264.AAC-[YTS.MX].mp4" (
  echo Cutting ep09-johnwick.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:28:00 -to 0:50:00 -i "John.Wick.Chapter.4.2023.720p.BluRay.x264.AAC-[YTS.MX].mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_clean\ep09-johnwick.mkv" && set /a OK+=1
) else (
  echo MISSING: John.Wick.Chapter.4.2023.720p.BluRay.x264.AAC-[YTS.MX].mp4
  set /a MISSING+=1
)

if exist "Mission.Impossible.Rogue.Nation.2015.720p.BluRay.x264.YIFY._YTS.AG.mp4" (
  echo Cutting ep13-mi.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:00:00 -to 0:08:00 -i "Mission.Impossible.Rogue.Nation.2015.720p.BluRay.x264.YIFY._YTS.AG.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_clean\ep13-mi.mkv" && set /a OK+=1
) else (
  echo MISSING: Mission.Impossible.Rogue.Nation.2015.720p.BluRay.x264.YIFY._YTS.AG.mp4
  set /a MISSING+=1
)

if exist "Avengers.Infinity.War.2018.REMASTERED.1080p.BluRay.x264.DD5.1-Pahe.in.mp4" (
  echo Cutting ep14-infinitywar.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:22:00 -to 1:40:00 -i "Avengers.Infinity.War.2018.REMASTERED.1080p.BluRay.x264.DD5.1-Pahe.in.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_clean\ep14-infinitywar.mkv" && set /a OK+=1
) else (
  echo MISSING: Avengers.Infinity.War.2018.REMASTERED.1080p.BluRay.x264.DD5.1-Pahe.in.mp4
  set /a MISSING+=1
)

if exist "Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv" (
  echo Cutting ep15-godzilla-b.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:14:00 -to 1:29:00 -i "Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips_clean\ep15-godzilla-b.mkv" && set /a OK+=1
) else (
  echo MISSING: Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv
  set /a MISSING+=1
)

echo.
echo Done: %OK% clips made, %MISSING% movies not found.
echo Upload everything in 'clips_clean' to the videos folder (it is fine to replace the old files with the same names).
pause
