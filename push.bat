@echo off
cd /d "%~dp0"
git add .
git commit -m "Auto Update Album"
git push origin main