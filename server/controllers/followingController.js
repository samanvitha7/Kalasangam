const User = require('../models/User');

class FollowingController {
  /**
   * Follow an artist or user
   */
  async followUser(req, res) {
    try {
      const { userId } = req.user; // Current user
      const { followId } = req.params; // User to follow

      const user = await User.findById(userId);
      const followUser = await User.findById(followId);

      if (!followUser) {
        return res.status(404).json({
          success: false,
          message: 'User to follow not found'
        });
      }

      // Check if already following
      if (user.following.includes(followId)) {
        return res.status(400).json({
          success: false,
          message: 'Already following this user'
        });
      }

      // Add to following and followers lists
      user.following.push(followId);
      followUser.followers.push(userId);

      await user.save();
      await followUser.save();

      res.json({
        success: true,
        message: 'Now following user',
        followingCount: user.following.length
      });
    } catch (error) {
      console.error('Error following user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to follow user'
      });
    }
  }

  /**
   * Unfollow an artist or user
   */
  async unfollowUser(req, res) {
    try {
      const { userId } = req.user;
      const { followId } = req.params;

      const user = await User.findById(userId);
      const unfollowUser = await User.findById(followId);

      if (!unfollowUser) {
        return res.status(404).json({
          success: false,
          message: 'User to unfollow not found'
        });
      }

      // Check if currently following
      if (!user.following.includes(followId)) {
        return res.status(400).json({
          success: false,
          message: 'Not following this user'
        });
      }

      // Remove from following and followers lists
      user.following = user.following.filter(id => id.toString() !== followId);
      unfollowUser.followers = unfollowUser.followers.filter(id => id.toString() !== userId);

      await user.save();
      await unfollowUser.save();

      res.json({
        success: true,
        message: 'Unfollowed user',
        followingCount: user.following.length
      });
    } catch (error) {
      console.error('Error unfollowing user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to unfollow user'
      });
    }
  }

  /**
   * Get following list
   */
  async getFollowing(req, res) {
    try {
      const { userId } = req.user;

      const user = await User.findById(userId).populate('following', 'name avatar');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        following: user.following
      });
    } catch (error) {
      console.error('Error getting following list:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get following list'
      });
    }
  }

  /**
   * Get followers list
   */
  async getFollowers(req, res) {
    try {
      const { userId } = req.user;

      const user = await User.findById(userId).populate('followers', 'name avatar');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        followers: user.followers
      });
    } catch (error) {
      console.error('Error getting followers list:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get followers list'
      });
    }
  }
}

module.exports = new FollowingController();

