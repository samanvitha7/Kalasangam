const express = require('express');
const followingController = require('../controllers/followingController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Following routes (all require authentication)
router.post('/follow/:followId', auth, (req, res) => followingController.followUser(req, res));
router.post('/unfollow/:followId', auth, (req, res) => followingController.unfollowUser(req, res));
router.get('/following', auth, (req, res) => followingController.getFollowing(req, res));
router.get('/followers', auth, (req, res) => followingController.getFollowers(req, res));

module.exports = router;
