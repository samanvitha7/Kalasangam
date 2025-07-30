const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const {
  getUserProfile,
  getPublicProfile,
  toggleLike,
  updateProfile,
  changePassword,
  deleteAccount,
  getUserStats,
  getUserActivity,
  toggleBookmark,
  getBookmarks,
  // Admin functions
  getAllUsers,
  createUser,
  updateUserRole,
  deleteUser,
  getUserStatsAdmin,
  getArtists,
  getArtistById
} = require('../controllers/user.controller');

const router = express.Router();

// Get current user profile
router.get('/profile', auth, getUserProfile);

// Get public profile of another user
router.get('/profile/:userId', auth, getPublicProfile);

// Get user statistics
router.get('/stats', auth, getUserStats);

// Get user activity (likes, bookmarks, artworks)
router.get('/activity', auth, getUserActivity);

// Update user profile
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('avatar').optional(),
  body('coverImage').optional(),
  body('portfolioUrl').optional().isURL().withMessage('Portfolio URL must be a valid URL'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be 500 characters or less'),
  body('location').optional().isLength({ max: 100 }).withMessage('Location must be 100 characters or less'),
  body('specialization').optional().isLength({ max: 100 }).withMessage('Specialization must be 100 characters or less')
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


// Like/Unlike artwork
router.post('/like/:artworkId', auth, toggleLike);

// Bookmark/Unbookmark artwork
router.post('/bookmark/:artworkId', auth, toggleBookmark);

// Get user's bookmarks
router.get('/bookmarks', auth, getBookmarks);

// Admin routes
// Get all users (admin only)
router.get('/admin/all', auth, getAllUsers);

// Get user statistics for admin dashboard
router.get('/admin/stats', auth, getUserStatsAdmin);

// Create new user (admin only)
router.post('/admin/create', auth, [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['Admin', 'Artist']).withMessage('Invalid role')
], createUser);

// Update user role (admin only)
router.put('/admin/:userId/role', auth, [
  body('role').isIn(['Admin', 'Artist']).withMessage('Invalid role')
], updateUserRole);

// Delete user (admin only)
router.delete('/admin/:userId', auth, deleteUser);

// Get all artists (public route)
router.get('/artists', getArtists);

// Get individual artist by ID (public route)
router.get('/artists/:artistId', getArtistById);

module.exports = router;
