const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  logout,
  verifyEmail,
  resendVerificationEmail
} = require('../controllers/auth.controller');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  login
);

router.post(
  '/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  forgotPassword
);

router.put(
  '/reset-password/:resettoken',
  [body('password').isLength({ min: 6 })],
  resetPassword
);

router.get('/me', auth, getMe);
router.post('/logout', auth, logout);

// Email verification routes
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
], resendVerificationEmail);

module.exports = router;
