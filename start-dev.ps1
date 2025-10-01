Write-Host "Starting Kalasangam Development Environment..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Kill any existing Node processes
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Start the server in a new PowerShell window
Write-Host "Starting server on port 5050..." -ForegroundColor Yellow
$serverPath = Join-Path $PSScriptRoot "server"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; Write-Host 'Starting Kalasangam Server...' -ForegroundColor Green; npm start" -WindowStyle Normal

# Wait for the server to start
Write-Host "Waiting for server to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check if server is running
Write-Host "Checking server status..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5050/api/health" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Server is running and responding!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Server might still be starting up..." -ForegroundColor Yellow
}

# Start the client using root npm script
Write-Host "Starting client on port 5173..." -ForegroundColor Yellow
Write-Host "Once started, open your browser to: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
npm run dev
