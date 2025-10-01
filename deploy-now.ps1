Write-Host "🚀 Kalasangam Quick Deployment Script" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Check if git is clean
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📦 Building production version..." -ForegroundColor Yellow
    
    # Run production build
    try {
        node build-production.js
        Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Build failed. Please check the errors above." -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "📤 Committing and pushing to GitHub..." -ForegroundColor Yellow
    
    # Add all changes
    git add .
    
    # Commit with deployment message
    $commitMessage = "🚀 Deploy: Fixed all deployment issues

- Updated render.yaml with proper build commands
- Fixed SPA routing with _redirects file
- Standardized environment variables
- Updated build scripts for production
- All deployment issues resolved"
    
    git commit -m "$commitMessage"
    
    # Push to main branch
    git push origin main
    
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to your Render dashboard: https://dashboard.render.com" -ForegroundColor White
    Write-Host "2. Your service should automatically start deploying" -ForegroundColor White
    Write-Host "3. Wait 3-5 minutes for deployment to complete" -ForegroundColor White
    Write-Host "4. Visit your app: https://kalasangam.onrender.com" -ForegroundColor White
    Write-Host ""
    
    Write-Host "🔍 Monitor deployment:" -ForegroundColor Cyan
    Write-Host "• Check Render logs for any errors" -ForegroundColor White
    Write-Host "• Test API health: https://kalasangam.onrender.com/api/health" -ForegroundColor White
    Write-Host "• Verify all pages load correctly" -ForegroundColor White
    
} else {
    Write-Host "✅ No changes detected - repository is up to date" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎯 To trigger redeployment anyway:" -ForegroundColor Cyan
    Write-Host "1. Go to Render dashboard: https://dashboard.render.com" -ForegroundColor White
    Write-Host "2. Click 'Manual Deploy' -> 'Deploy latest commit'" -ForegroundColor White
}

Write-Host ""
Write-Host "📚 For troubleshooting, see: DEPLOYMENT_GUIDE.md" -ForegroundColor Yellow

Read-Host "Press Enter to exit"