# 🚀 How to Start Kalasangam Project

## Method 1: Automatic Startup (Recommended)
1. **Run the startup script:**
   ```powershell
   .\start-dev.ps1
   ```
   - This will open the server in a new window and start the client in the current window

## Method 2: Manual Startup (Two Terminals)

### Terminal 1 - Start the Server:
```powershell
cd server
npm start
```
*Wait until you see "✅ MongoDB connected successfully"*

### Terminal 2 - Start the Client:
```powershell
npm run dev
```

## 🌐 Access Your Application:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5050/api/health

## ❗ If Port 5173 Doesn't Work:
The client might start on a different port (like 5174) if 5173 is busy. Check the terminal output for the correct URL.

## 🔧 Troubleshooting:
If you get errors:
1. Kill all Node processes:
   ```powershell
   Get-Process -Name node | Stop-Process -Force
   ```
2. Try again

## ✅ You'll Know It's Working When:
- Server terminal shows "✅ MongoDB connected successfully"
- Client terminal shows "Local: http://localhost:5173/"
- Your browser shows the Kalasangam website at http://localhost:5173