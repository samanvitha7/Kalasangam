// Backup original rate limiting file
const fs = require('fs');
const path = require('path');

const rateLimitPath = path.join(__dirname, 'middleware', 'rateLimiting.js');
const backupPath = path.join(__dirname, 'middleware', 'rateLimiting.js.backup');

// Create backup
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(rateLimitPath, backupPath);
  console.log('✅ Backup created: rateLimiting.js.backup');
}

// Create temporary version with higher limits
const tempRateLimitCode = `const rateLimit = require('express-rate-limit');

// TEMPORARY: Higher rate limits for testing
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Increased from 5 to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for registration
const registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Increased from 3 to 10 registration attempts per hour
  message: {
    success: false,
    message: 'Too many registration attempts, please try again later.'
  }
});

// Rate limiting for password reset
const passwordResetRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Increased from 3 to 10 password reset attempts
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again later.'
  }
});

module.exports = {
  authRateLimit,
  registerRateLimit,
  passwordResetRateLimit
};`;

// Write temporary version
fs.writeFileSync(rateLimitPath, tempRateLimitCode);
console.log('✅ Temporary rate limits applied (100 auth requests per 15 min)');
console.log('🔄 Please restart your server with: npm run dev');
console.log('');
console.log('⚠️  REMEMBER: Run restoreRateLimit.js when done testing to restore security!');
console.log('');
console.log('Your test credentials:');
console.log('1. artist@test.com / artist123456789');
console.log('2. artist2@test.com / testartist123456');
console.log('3. rajesh@test.com / rajesh987654321');
console.log('4. admin@test.com / admin123456789');
