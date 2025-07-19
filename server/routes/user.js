const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {
  getUserProfile,
  getPublicProfile,
  toggleFollow,
  toggleLike,
  updateProfile,
  changePassword,
  deleteAccount,
  getUserStats,
  toggleBookmark,
  getBookmarks
} = require('../controllers/user.controller');

const router = express.Router();

// Get current user profile
router.get('/profile', auth, getUserProfile);

// Get public profile of another user
router.get('/profile/:userId', auth, getPublicProfile);

// Get user statistics
router.get('/stats', auth, getUserStats);

// Update user profile
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL')
], updateProfile);

// Change password
router.put('/change-password', auth, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], changePassword);

// Delete account
router.delete('/delete-account', auth, [
  body('password').notEmpty().withMessage('Password is required to delete account')
], deleteAccount);

// Follow/Unfollow user
router.post('/follow/:userId', auth, toggleFollow);

// Like/Unlike artwork
router.post('/like/:artworkId', auth, toggleLike);

// Bookmark/Unbookmark artwork
router.post('/bookmark/:artworkId', auth, toggleBookmark);

// Get user's bookmarks
router.get('/bookmarks', auth, getBookmarks);

module.exports = router;
