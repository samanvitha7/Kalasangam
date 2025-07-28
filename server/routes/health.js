const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 5050,
    cors: 'enabled'
  });
});

// Test endpoint that requires no authentication
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Test endpoint working',
    origin: req.headers.origin || 'no origin',
    userAgent: req.headers['user-agent'] || 'no user agent'
  });
});

module.exports = router;
