# Kalasangam Project Troubleshooting Guide

## Quick Start
Your project is now properly set up! Here are the ways to run it:

### Option 1: Using the startup scripts
- Double-click `start-dev.bat` (Command Prompt version)
- Or run `.\start-dev.ps1` in PowerShell

### Option 2: Manual startup
1. **Start the server first:**
   ```powershell
   cd server
   npm start
   ```
   
2. **Start the client (in a new terminal):**
   ```powershell
   cd client\kala-sangam
   npm run dev
   ```

### Option 3: Using root package.json scripts
```powershell
# Start server
npm run start

# Start client (in another terminal)
npm run dev
```

## How to Access the Application
- **Frontend (Client):** http://localhost:5173 or http://localhost:5174
- **Backend API:** http://localhost:5050
- **API Health Check:** http://localhost:5050/api/health

## Common Issues and Solutions

### Issue 1: "Port already in use"
**Solution:** Kill existing Node.js processes
```powershell
Get-Process -Name node | Stop-Process -Force
```

### Issue 2: "Cannot connect to server"
**Symptoms:** Client loads but API calls fail
**Solution:** 
1. Make sure the server is running on port 5050
2. Check that `.env` files are properly configured
3. Verify the client's `.env` has `VITE_API_URL=http://localhost:5050`

### Issue 3: Dependencies issues
**Solution:** Reinstall dependencies
```powershell
# In root directory
npm install

# In server directory  
cd server
npm install

# In client directory
cd client\kala-sangam
npm install
```

### Issue 4: Database connection issues
**Symptoms:** Server starts but shows MongoDB connection errors
**Solution:** The project is configured with a cloud MongoDB instance, so this should work automatically. If issues persist, check the `MONGO_URI` in `server/.env`

## Project Structure
```
Kalasangam/
├── client/kala-sangam/     # React + Vite frontend
├── server/                 # Express.js backend
├── start-dev.bat          # Windows batch startup script
├── start-dev.ps1          # PowerShell startup script
└── package.json           # Root package with convenience scripts
```

## Environment Variables
- **Client (.env):** `VITE_API_URL=http://localhost:5050`
- **Server (.env):** Contains database, JWT, email, and API configurations

## Verification Checklist
- [ ] Node.js version >= 18.0.0 ✓
- [ ] Dependencies installed ✓
- [ ] Server starts and connects to MongoDB ✓
- [ ] Client starts on port 5173/5174 ✓
- [ ] Environment variables configured ✓

The project is working correctly! If you're still experiencing issues, please describe the specific error message or behavior you're seeing.