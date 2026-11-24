@echo off
cd /d "%~dp0"
echo Installing the Physics Nerd Facebook + Instagram tool (one time)...
call npm install
echo.
call npm run check
pause
