#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

console.log('🔍 Checking deployment status...\n');

// Check what API URL is currently built in the local dist
console.log('1. Checking local build configuration:');
try {
  const indexPath = './client/kala-sangam/dist/index.html';
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const apiUrlMatch = indexContent.match(/kalasangam\.onrender\.com/);
    if (apiUrlMatch) {
      console.log('✅ Local build has correct API URL (kalasangam.onrender.com)');
    } else {
      console.log('❌ Local build may have wrong API URL');
    }
  } else {
    console.log('❌ No local build found - need to run npm run build:production');
  }
} catch (e) {
  console.log('❌ Error checking local build:', e.message);
}

// Check deployed frontend source
console.log('\n2. Checking deployed frontend:');
const req = https.get('https://kala-sangam.onrender.com', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (data.includes('kalasangam.onrender.com')) {
      console.log('✅ Deployed frontend has correct API URL (kalasangam.onrender.com)');
    } else if (data.includes('onrender.com')) {
      const match = data.match(/https:\/\/[^"]*onrender\.com/);
      console.log('❌ Deployed frontend has wrong API URL:', match ? match[0] : 'unknown');
    } else {
      console.log('❓ Could not detect API URL in deployed frontend');
    }
    
    // Check build timestamp
    const timestampMatch = data.match(/build.*?(\d{4}-\d{2}-\d{2})/);
    if (timestampMatch) {
      console.log('📅 Frontend build date:', timestampMatch[1]);
    }
  });
});

req.on('error', (e) => {
  console.log('❌ Error checking deployed frontend:', e.message);
});

console.log('\n3. Check your Render dashboard:');
console.log('   - Frontend: https://dashboard.render.com/web/srv-<your-frontend-service-id>');
console.log('   - Backend: https://dashboard.render.com/web/srv-<your-backend-service-id>');
console.log('\n4. If deployment is stuck, try:');
console.log('   - Manual Deploy → Deploy latest commit');
console.log('   - Or Manual Deploy → Clear build cache & deploy');
