# 🚀 Deployment Guide for Kala Sangam

## 📋 Overview
This guide helps you deploy your traditional arts application in both local development and production environments.

## 🔧 Current Configuration

### Environment Files
- `.env` - Local development (points to `http://localhost:5050`)
- `.env.production` - Production deployment (points to `https://traditional-arts-backend.onrender.com`)

### Smart API Detection
The app automatically detects the environment and uses the appropriate API URL:
- **Local development**: `http://localhost:5050`
- **Production**: `https://traditional-arts-backend.onrender.com`

## 🏠 Local Development

### 1. Start Backend Server
```bash
cd server
npm install
npm run dev
# Server will run on http://localhost:5050
```

### 2. Start Frontend
```bash
cd client/kala-sangam
npm install
npm run dev
# Frontend will run on http://localhost:5173
```

## 🌐 Production Deployment

### 1. Deploy Backend to Render
- Your backend will be deployed as `traditional-arts-backend.onrender.com`
- The render.yaml is configured to handle this

### 2. Deploy Frontend to Render
- Your frontend will automatically connect to the production backend
- No manual configuration needed!

## 🔍 Debugging

### Check Current API Configuration
Add this to any React component to debug:
```javascript
import { logApiConfig } from '../utils/apiConfig';

// In your component
useEffect(() => {
  logApiConfig();
}, []);
```

### Environment Variables
```bash
# Check current API URL
npm run debug:api

# Build for production
npm run build:production

# Build for local
npm run build:local
```

## 🚨 Troubleshooting

### 404 Errors on Deployed Site
1. **Check if backend is running**: Visit `https://traditional-arts-backend.onrender.com/api/health`
2. **Check browser console**: Look for API URL being used
3. **Verify deployment**: Ensure both frontend and backend are deployed

### Local Development Issues
1. **Backend not running**: Make sure `npm run dev` is running in server folder
2. **Port conflicts**: Backend should be on 5050, frontend on 5173
3. **Environment variables**: Check `.env` file exists and has correct URL

## 📝 Deploy Commands

### Quick Deploy (Production)
```bash
# From root directory
git add .
git commit -m "Deploy updates"
git push origin main
```

### Local Testing
```bash
# Backend
cd server && npm run dev

# Frontend (new terminal)
cd client/kala-sangam && npm run dev
```

## 🎯 How It Works

The smart API detection works like this:

1. **Environment Variable First**: Uses `VITE_API_URL` if set
2. **Hostname Detection**: Checks if running on localhost
3. **Automatic Fallback**: 
   - Localhost → `http://localhost:5050`
   - Production → `https://traditional-arts-backend.onrender.com`

## ✅ Verification

After deployment, check:
- [ ] Frontend loads without errors
- [ ] API calls work (check Network tab in browser dev tools)
- [ ] Console shows correct API URL
- [ ] No 404 errors for "gallery:1" or similar

## 🔗 Important URLs

- **Local Frontend**: http://localhost:5173
- **Local Backend**: http://localhost:5050
- **Production Backend**: https://traditional-arts-backend.onrender.com
- **Production Frontend**: [Your Render frontend URL]
