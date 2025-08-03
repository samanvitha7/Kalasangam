const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Health check endpoint for Render - should respond quickly without database dependency
router.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 5050,
    cors: 'enabled',
    database: {
      status: dbStates[dbStatus] || 'unknown',
      ready: dbStatus === 1
    },
    environment: process.env.NODE_ENV || 'development'
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
