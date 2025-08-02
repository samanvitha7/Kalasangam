#!/bin/bash

echo "🚀 Deploying Traditional Arts Application - Fixing 'Not Found' Issues"
echo "=================================================================="

# Step 1: Build frontend with production settings
echo "📦 Building frontend with production configuration..."
cd client/kala-sangam
npm install
npm run build:production

# Step 2: Copy build to root dist (for backup)
echo "📁 Copying build to root dist folder..."
cd ../..
cp -r client/kala-sangam/dist/* ./dist/

# Step 3: Verify _redirects file is present
echo "🔍 Verifying _redirects file..."
if [ -f "client/kala-sangam/dist/_redirects" ]; then
    echo "✅ _redirects file found in build"
    cat client/kala-sangam/dist/_redirects
else
    echo "❌ _redirects file missing - this could cause routing issues!"
fi

# Step 4: Git commit and push
echo "📤 Committing and pushing changes..."
git add .
git commit -m "🔧 Fix deployment: Update render config, backend env, and frontend build

- Fixed render.yaml with proper environment variables and health check
- Updated backend .env.production with all required variables  
- Built frontend with production API configuration
- Ensured _redirects file is included for SPA routing
- This should fix all 'not found' issues on deployed pages"

git push origin main

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "🔧 What was fixed:"
echo "   • Backend environment variables properly configured"
echo "   • Frontend built with correct production API URL"
echo "   • SPA routing configured with _redirects file"
echo "   • Render configuration updated with health checks"
echo ""
echo "📋 Next steps:"
echo "   1. Go to your Render dashboard"
echo "   2. Wait for automatic deployment (2-3 minutes)"
echo "   3. Test your deployed app - pages should load correctly now"
echo "   4. Check that API calls work in browser developer tools"
echo ""
echo "🆘 If issues persist:"
echo "   • Check Render logs for backend deployment errors"
echo "   • Verify environment variables are set in Render dashboard"
echo "   • Test backend API directly: https://traditional-arts-backend.onrender.com/api/health"
