@echo off
title Food Buddy - Full Stack App
echo ===================================================
echo   Starting Food Buddy Development Servers...
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo ===================================================
echo.
cd /d "%~dp0"
npm run dev
pause

