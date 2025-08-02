# Backend Deployment Fix Guide

## Issue Diagnosis
Your backend API at `https://kalasangam-backend.onrender.com` is returning 404 errors. The server code works fine locally, so this is a deployment configuration issue.

## Solution Steps

### 1. Update Render Service Configuration

In your Render dashboard for the backend service:

**Build Command:**
```bash
cd server && npm install
```

**Start Command:**
```bash
cd server && npm start
```

**Environment Variables to Set:**
```
NODE_ENV=production
MONGO_URI=mongodb+srv://bolisettysamanvitha:XpFrzygY574FCLHf@cluster0.tohbv1j.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=4d62b08c4f0532c4d8e2b81e0ecb087a7060d431bb12ff3a3d94c842cbbba249
JWT_EXPIRE=30d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=nefariamordeath@gmail.com
SMTP_PASSWORD=qgyg jgsc qxxa wdoe
FROM_NAME=KALASANGAM
FROM_EMAIL=nefariamordeath@gmail.com
BASE_URL_PROD=https://kalasangam.onrender.com
EVENTBRITE_TOKEN=2SJGH6KHAC74J6QOKKW3
```

### 2. Set Health Check Path
In Render dashboard, set the health check path to:
```
/api/health
```

### 3. Repository Settings
Ensure your Render service is connected to the correct:
- Repository: Your GitHub repo
- Branch: main (or your primary branch)
- Root Directory: Leave empty (since we use `cd server` in commands)

### 4. Deploy Settings
- **Auto-Deploy:** Enabled
- **Build Command:** `cd server && npm install`
- **Start Command:** `cd server && npm start`

## Testing After Deployment

Once deployed, test these endpoints:

1. **Root Health Check:**
   ```bash
   curl https://kalasangam-backend.onrender.com/
   ```
   Should return:
   ```json
   {
     "success": true,
     "message": "Kalasangam Backend API is running",
     "environment": "production",
     "timestamp": "2025-08-02T06:13:26.478Z"
   }
   ```

2. **API Health Check:**
   ```bash
   curl https://kalasangam-backend.onrender.com/api/health
   ```
   Should return:
   ```json
   {
     "success": true,
     "message": "Server is running",
     "timestamp": "2025-08-02T06:13:26.495Z",
     "port": "10000",
     "cors": "enabled"
   }
   ```

## What Was Fixed

1. **Environment Configuration:** Added proper production environment handling
2. **Root Route:** Added a root endpoint for basic health checks
3. **Deployment Commands:** Corrected build and start commands for Render
4. **CORS Configuration:** Ensured Render domains are allowed
5. **MongoDB Connection:** Verified connection string is properly configured

## Common Issues and Solutions

### Issue: "Application failed to respond"
- Check that all environment variables are set correctly
- Verify the MongoDB connection string is valid
- Check Render logs for startup errors

### Issue: CORS errors
- Ensure your frontend domain is added to CORS configuration
- Check that environment variables are set correctly

### Issue: 502 Bad Gateway
- Usually indicates the server isn't starting properly
- Check Render logs for specific error messages
- Verify all dependencies are installed correctly

## Final Steps

1. Go to your Render dashboard
2. Update the backend service with the new configuration
3. Deploy the changes
4. Wait 2-3 minutes for deployment to complete
5. Test the endpoints above
6. Once backend is working, test your frontend

Your backend should now be accessible and responding to API requests properly.
