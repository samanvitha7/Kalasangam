#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build process...\n');

const clientPath = path.join(__dirname, 'client', 'kala-sangam');

try {
  // Change to client directory
  process.chdir(clientPath);
  console.log('📁 Changed to client directory:', clientPath);

  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('✅ Removed old dist folder');
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');

  // Build the project
  console.log('🔨 Building production bundle...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed');

  // Check if build was successful
  if (fs.existsSync('dist')) {
    console.log('✅ Build successful! Files generated in dist folder');
    
    // List generated files
    const distFiles = fs.readdirSync('dist', { recursive: true });
    console.log('\n📂 Generated files:');
    distFiles.forEach(file => console.log(`  - ${file}`));
    
    // Check bundle size
    const stats = fs.statSync('dist');
    console.log(`\n📊 Build size: ${(getDirSize('dist') / 1024 / 1024).toFixed(2)} MB`);
    
    console.log('\n🎉 Production build ready for deployment!');
    console.log('📝 See PRODUCTION_FIX_GUIDE.md for deployment instructions');
    
  } else {
    throw new Error('Build failed - no dist folder found');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

function getDirSize(dirPath) {
  let size = 0;
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      size += getDirSize(filePath);
    } else {
      size += stats.size;
    }
  }
  
  return size;
}
