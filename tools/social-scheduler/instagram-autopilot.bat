@echo off
cd /d "%~dp0"
node src\cli.mjs instagram --auto >> instagram-log.txt 2>&1
