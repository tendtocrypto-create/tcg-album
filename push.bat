@echo off
cd /d "%~dp0"
"C:\Program Files (x86)\Git\cmd\git.exe" add users/
"C:\Program Files (x86)\Git\cmd\git.exe" commit -m "Update user collection"
"C:\Program Files (x86)\Git\cmd\git.exe" push
pause