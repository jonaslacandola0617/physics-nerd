@echo off
REM Physics Nerd EP26-35 (batch 1: 8 movies). Put this in the movies folder and double-click it.
REM Output goes to a "clips_s4" folder. All audio tracks are kept (Claude picks the English one).
cd /d "%~dp0"
if not exist clips_s4 mkdir clips_s4
set OK=0
set MISSING=0

call :cut "Speed.1994.1080p.BluRay.x264-OFT.mkv" "ep26-speed.mkv" 0:50:00 1:06:00
call :cut "Avengers.Age.of.Ultron.2015.1080p.BluRay.x265-RARBG.mp4" "ep27-ultron-a.mkv" 1:46:00 2:01:00
call :cut "Avengers.Age.of.Ultron.2015.1080p.BluRay.x265-RARBG.mp4" "ep27-ultron-b.mkv" 2:03:00 2:17:00
call :cut "Gravity.2013.1080p.ATVP.PMTP.WEB-DL.DD.5.1.H.264-PiRaTeS.mkv" "ep28-gravity.mkv" 0:25:00 0:40:00
call :cut "Fast.and.Furious.F9.The.Fast.Saga.2021.DC.1080p.BluRay.x264.DTS.mp4" "ep29-f9.mkv" 1:58:00 2:20:00
call :cut "Armageddon.1998.1080p.BDRip.DTS.x265.10bit-MarkII-xpost.mkv" "ep31-armageddon-a.mkv" 1:38:00 1:56:00
call :cut "Armageddon.1998.1080p.BDRip.DTS.x265.10bit-MarkII-xpost.mkv" "ep31-armageddon-b.mkv" 2:10:00 2:25:00
call :cut "Mission_Impossible_Ghost_Protocol_2011_1080p_BluRay_x265_10bit.mkv.mp4" "ep32-ghostprotocol.mkv" 0:53:00 1:14:00
call :cut "Titanic 1997 Extended BluRay 10Bit 1080p DD+5.1 H265-d3g-xpost.mkv" "ep33-titanic.mkv" 2:48:00 3:12:00
call :cut "Die.Hard.2.1990.BluRay.1080p.DDP.5.1.x264-hallowed.mkv" "ep35-diehard2.mkv" 1:50:00 2:05:00

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
