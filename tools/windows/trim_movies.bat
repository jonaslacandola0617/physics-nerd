@echo off
REM Physics Nerd: cut the scene windows out of the full movies (no re-encoding, takes seconds).
REM Put this file in the same folder as the movies and double-click it. Output goes to a 'clips' folder.
cd /d "%~dp0"
if not exist clips mkdir clips
set OK=0
set MISSING=0

if exist "Captain.America.Civil.War.2016.REMASTERED.720p.BluRay.x264-ESub.Hollymoviehd.mp4" (
  echo Cutting ep03-civilwar.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:55:00 -to 1:06:00 -i "Captain.America.Civil.War.2016.REMASTERED.720p.BluRay.x264-ESub.Hollymoviehd.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep03-civilwar.mkv" && set /a OK+=1
) else (
  echo MISSING: Captain.America.Civil.War.2016.REMASTERED.720p.BluRay.x264-ESub.Hollymoviehd.mp4
  set /a MISSING+=1
)

if exist "Top.Gun.Maverick.2022.IMAX.720p.AMZN.WEBRip.x264.ESub.Hollymoviehd.mp4" (
  echo Cutting ep07-topgun.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:03:00 -to 0:17:00 -i "Top.Gun.Maverick.2022.IMAX.720p.AMZN.WEBRip.x264.ESub.Hollymoviehd.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep07-topgun.mkv" && set /a OK+=1
) else (
  echo MISSING: Top.Gun.Maverick.2022.IMAX.720p.AMZN.WEBRip.x264.ESub.Hollymoviehd.mp4
  set /a MISSING+=1
)

if exist "John.Wick.Chapter.4.2023.720p.AMZN.WEB-DL.x264.ESub.Hollymoviehd.mp4" (
  echo Cutting ep09-johnwick-a.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:28:00 -to 0:57:00 -i "John.Wick.Chapter.4.2023.720p.AMZN.WEB-DL.x264.ESub.Hollymoviehd.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep09-johnwick-a.mkv" && set /a OK+=1
) else (
  echo MISSING: John.Wick.Chapter.4.2023.720p.AMZN.WEB-DL.x264.ESub.Hollymoviehd.mp4
  set /a MISSING+=1
)

if exist "John.Wick.Chapter.4.2023.720p.AMZN.WEB-DL.x264.ESub.Hollymoviehd.mp4" (
  echo Cutting ep09-johnwick-b.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 2:18:00 -to 2:37:00 -i "John.Wick.Chapter.4.2023.720p.AMZN.WEB-DL.x264.ESub.Hollymoviehd.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep09-johnwick-b.mkv" && set /a OK+=1
) else (
  echo MISSING: John.Wick.Chapter.4.2023.720p.AMZN.WEB-DL.x264.ESub.Hollymoviehd.mp4
  set /a MISSING+=1
)

if exist "The.Avengers.2012.1080p.DSNP.WEB-DL.H264.DDP5.1.Atmos-TAGWEB.mkv" (
  echo Cutting ep11-avengers.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:58:00 -to 2:10:00 -i "The.Avengers.2012.1080p.DSNP.WEB-DL.H264.DDP5.1.Atmos-TAGWEB.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep11-avengers.mkv" && set /a OK+=1
) else (
  echo MISSING: The.Avengers.2012.1080p.DSNP.WEB-DL.H264.DDP5.1.Atmos-TAGWEB.mkv
  set /a MISSING+=1
)

if exist "The.Martian.2015.1080p.BluRay.x264-OFT.mkv" (
  echo Cutting ep12-martian.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 2:01:00 -to 2:15:00 -i "The.Martian.2015.1080p.BluRay.x264-OFT.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep12-martian.mkv" && set /a OK+=1
) else (
  echo MISSING: The.Martian.2015.1080p.BluRay.x264-OFT.mkv
  set /a MISSING+=1
)

if exist "Mission.Impossible.Rogue.Nation.2015.720p.BluRay.x264.ESub.Hollymoviehd.mp4" (
  echo Cutting ep13-mi.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 0:00:00 -to 0:10:00 -i "Mission.Impossible.Rogue.Nation.2015.720p.BluRay.x264.ESub.Hollymoviehd.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep13-mi.mkv" && set /a OK+=1
) else (
  echo MISSING: Mission.Impossible.Rogue.Nation.2015.720p.BluRay.x264.ESub.Hollymoviehd.mp4
  set /a MISSING+=1
)

if exist "Avengers.Infinity.War.2018.720p.BluRay.x264-ESub.Hollymoviehd.mp4" (
  echo Cutting ep14-infinitywar.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:33:00 -to 1:52:00 -i "Avengers.Infinity.War.2018.720p.BluRay.x264-ESub.Hollymoviehd.mp4" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep14-infinitywar.mkv" && set /a OK+=1
) else (
  echo MISSING: Avengers.Infinity.War.2018.720p.BluRay.x264-ESub.Hollymoviehd.mp4
  set /a MISSING+=1
)

if exist "Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv" (
  echo Cutting ep15-godzilla.mkv ...
  ffmpeg -hide_banner -loglevel error -y -ss 1:28:00 -to 1:57:00 -i "Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv" -map 0:v:0 -map 0:a -map 0:s? -c copy "clips\ep15-godzilla.mkv" && set /a OK+=1
) else (
  echo MISSING: Godzilla 2014.1080p Brrip x264 Aac-M2G.mkv
  set /a MISSING+=1
)

echo.
echo Done: %OK% clips made, %MISSING% movies not found.
echo Upload everything in the 'clips' folder to the Physics Nerd videos folder on Google Drive.
pause
