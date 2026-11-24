@echo off
cd /d "%~dp0"
for /f "usebackq delims=" %%t in (`node -e "console.log(require('./schedule.json').defaults.time)"`) do set PNTIME=%%t
if "%PNTIME%"=="" set PNTIME=06:00
schtasks /Create /F /SC DAILY /ST %PNTIME% /TN "Physics Nerd Instagram" /TR "\"%~dp0instagram-autopilot.bat\""
if errorlevel 1 (echo Could not create the daily task.) else (echo Autopilot ON: every day at %PNTIME% this PC posts the Reel due that day on Instagram.)
echo Your PC must be on and you must be signed in to Windows at that time.
echo What it did is written to instagram-log.txt
pause
