@echo off
cd /d "%~dp0"
echo Installing the Physics Nerd Facebook + Instagram tool (one time)...
call npm install
echo.
echo Downloading the videos (about 40 MB each)...
call npm run download
echo.
call npm run check
pause
