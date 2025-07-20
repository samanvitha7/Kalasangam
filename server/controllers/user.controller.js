const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Get current user profile with detailed info
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        likes: user.likes,
        follows: user.follows,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
};

// Get public profile of another user
const getPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .select('-password -email -resetPasswordToken -resetPasswordExpire -emailVerificationToken');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current user follows this user
    const currentUser = await User.findById(req.user.id);
    const isFollowing = currentUser.follows.includes(userId);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        follows: user.follows,
        followersCount: await User.countDocuments({ follows: userId }),
        createdAt: user.createdAt
      },
      isFollowing
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
};

// Follow/Unfollow an artist
const toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    if (userId === currentUserId) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = await User.findById(currentUserId);
    const isFollowing = currentUser.follows.includes(userId);

    if (isFollowing) {
      // Unfollow
      currentUser.follows = currentUser.follows.filter(id => id.toString() !== userId);
      await currentUser.save();
      res.status(200).json({ message: 'Unfollowed successfully', isFollowing: false });
    } else {
      // Follow
      currentUser.follows.push(userId);
      await currentUser.save();
      res.status(200).json({ message: 'Followed successfully', isFollowing: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle follow', error: error.message });
  }
};

// Like/Unlike artwork
const toggleLike = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const isLiked = user.likes.includes(artworkId);

    if (isLiked) {
      // Unlike
      user.likes = user.likes.filter(id => id.toString() !== artworkId);
      await user.save();
      res.status(200).json({ message: 'Unliked successfully', isLiked: false });
    } else {
      // Like
      user.likes.push(artworkId);
      await user.save();
      res.status(200).json({ message: 'Liked successfully', isLiked: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle like', error: error.message });
  }
};

// Bookmark/Unbookmark artwork
const toggleBookmark = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const isBookmarked = user.bookmarks.includes(artworkId);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarks = user.bookmarks.filter(id => id.toString() !== artworkId);
      await user.save();
      res.status(200).json({ message: 'Bookmark removed successfully', isBookmarked: false });
    } else {
      // Add bookmark
      user.bookmarks.push(artworkId);
      await user.save();
      res.status(200).json({ message: 'Bookmarked successfully', isBookmarked: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle bookmark', error: error.message });
  }
};

// Get user's bookmarked artworks
const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId)
      .populate({
        path: 'bookmarks',
        populate: {
          path: 'artist',
          select: 'name avatar'
        }
      });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      bookmarks: user.bookmarks,
      count: user.bookmarks.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookmarks', error: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { name, avatar } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to change password', error: error.message });
  }
};

// Delete account
const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password before deletion
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }

    // Remove user from other users' follows
    await User.updateMany(
      { follows: userId },
      { $pull: { follows: userId } }
    );

    // Delete the user account
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete account', error: error.message });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followersCount = await User.countDocuments({ follows: userId });

    res.status(200).json({
      stats: {
        likesCount: user.likes.length,
        followsCount: user.follows.length,
        followersCount: followersCount,
        bookmarksCount: user.bookmarks.length,
        joinedDate: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user stats', error: error.message });
  }
};

module.exports = {
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
};
