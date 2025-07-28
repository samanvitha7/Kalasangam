const express = require('express');
const verificationController = require('../controllers/verificationController');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Artist verification routes (requires authentication)
router.post('/submit', auth, (req, res) => verificationController.submitVerificationRequest(req, res));
router.get('/status', auth, (req, res) => verificationController.getVerificationStatus(req, res));

// Admin routes (requires admin role)
router.get('/pending', auth, (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    });
  }
  next();
}, (req, res) => verificationController.getPendingVerifications(req, res));

router.post('/review/:targetUserId', auth, (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    });
  }
  next();
}, (req, res) => verificationController.reviewVerification(req, res));

router.get('/stats', auth, (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    });
  }
  next();
}, (req, res) => verificationController.getVerificationStats(req, res));

// Public routes (no auth required)
router.get('/verified-artists', (req, res) => verificationController.getVerifiedArtists(req, res));

module.exports = router;
