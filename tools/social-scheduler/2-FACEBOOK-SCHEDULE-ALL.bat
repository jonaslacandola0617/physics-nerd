@echo off
cd /d "%~dp0"
call npm run facebook -- --days 60
pause
