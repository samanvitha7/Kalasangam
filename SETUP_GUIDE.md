# KalaSangam Project Setup Guide

## Prerequisites
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** for version control

## Project Structure
```
TRADITIONAL-ARTS/
├── client/
│   └── kala-sangam/          # Frontend React app
├── server/                   # Backend Express app
└── README.md
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TRADITIONAL-ARTS
```

### 2. Frontend Setup (Client)
```bash
# Navigate to client directory
cd client/kala-sangam

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 3. Backend Setup (Server)
```bash
# Open a new terminal and navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (if not exists)
touch .env

# Add the following to your .env file:
# PORT=5050
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key

# Start the server
npm start
```

## Common Issues & Solutions

### Issue 1: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

### Issue 2: Tailwind CSS not working
**Solution:**
Make sure you're in the correct directory (`client/kala-sangam`) and run:
```bash
npm run tailwind:init
```

### Issue 3: Port conflicts
**Solution:**
- Frontend runs on: `http://localhost:5173`
- Backend runs on: `http://localhost:5050`

If ports are in use, kill the processes:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Kill process on port 5050
lsof -ti:5050 | xargs kill -9
```

### Issue 4: Authentication/API errors
**Solution:**
1. Make sure the backend server is running
2. Check `.env` file in server directory
3. Verify MongoDB connection

### Issue 5: React Router issues
**Solution:**
Make sure you're accessing the app via `http://localhost:5173/home` not just `http://localhost:5173`

## Development Workflow

### Starting the Project
1. **Terminal 1** (Backend):
   ```bash
   cd server
   npm start
   ```

2. **Terminal 2** (Frontend):
   ```bash
   cd client/kala-sangam
   npm run dev
   ```

### Available Scripts

#### Frontend (client/kala-sangam)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend (server)
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (if configured)

## Project URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5050
- **Main App**: http://localhost:5173/home

## Troubleshooting Checklist

If the website isn't working, check these in order:

1. ✅ **Node.js Version**: `node --version` (should be 16+)
2. ✅ **Dependencies Installed**: Both client and server `node_modules` exist
3. ✅ **Backend Running**: Server logs show "Server running on port 5050"
4. ✅ **Frontend Running**: Browser shows React app
5. ✅ **Network Tab**: No 404 errors for API calls
6. ✅ **Console Errors**: Check browser console for JavaScript errors

## File Structure Verification

Make sure these key files exist:
```
client/kala-sangam/
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
└── public/

server/
├── package.json
├── server.js
├── .env
└── routes/
```

## Environment Variables

### Server (.env)
```
PORT=5050
MONGODB_URI=mongodb://localhost:27017/kalasangam
JWT_SECRET=your_secret_key_here
```

### Client (No .env needed for basic setup)

## Contact
If you're still having issues, please share:
1. Error messages (screenshot/copy-paste)
2. Your operating system
3. Node.js version (`node --version`)
4. Which step failed

---
**Happy Coding! 🎨**
