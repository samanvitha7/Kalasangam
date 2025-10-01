@echo off
echo Starting Kalasangam Development Environment...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Start the server in a new window
echo Starting server...
start "Kalasangam Server" cmd /k "cd /d server && npm start"

REM Wait a moment for the server to start
timeout /t 3 /nobreak >nul

REM Start the client
echo Starting client...
cd client\kala-sangam
npm run dev

pause