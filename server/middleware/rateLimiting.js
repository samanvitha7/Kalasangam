const rateLimit = require('express-rate-limit');

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
};