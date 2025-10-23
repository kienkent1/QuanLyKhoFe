@echo off
echo Starting JSON Server...
cd /d "%~dp0"
npx json-server db.json --port 3001
pause
