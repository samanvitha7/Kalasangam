const User = require('../models/User');
const mongoose = require('mongoose');

class VerificationController {
  /**
   * Submit verification request
   */
  async submitVerificationRequest(req, res) {
    try {
      const { userId } = req.user; // From auth middleware
      const { documents, notes } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user is an artist
      if (user.role !== 'Artist') {
        return res.status(403).json({
          success: false,
          message: 'Only artists can request verification'
        });
      }

      // Check if already verified
      if (user.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'User is already verified'
        });
      }

      // Check if verification is already pending
      if (user.verificationStatus === 'pending') {
        return res.status(400).json({
          success: false,
          message: 'Verification request is already pending'
        });
      }

      // Update user verification status
      user.verificationStatus = 'pending';
      user.verificationDocuments = documents || [];
      user.verificationNotes = notes || '';
      
      await user.save();

      res.json({
        success: true,
        message: 'Verification request submitted successfully',
        verificationStatus: user.verificationStatus
      });
    } catch (error) {
      console.error('Error submitting verification request:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit verification request'
      });
    }
  }

  /**
   * Get verification status
   */
  async getVerificationStatus(req, res) {
    try {
      const { userId } = req.user;

      const user = await User.findById(userId)
        .select('isVerified verificationStatus verifiedAt verificationNotes')
        .populate('verifiedBy', 'name email');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        verification: {
          isVerified: user.isVerified,
          status: user.verificationStatus,
          verifiedAt: user.verifiedAt,
          verifiedBy: user.verifiedBy,
          notes: user.verificationNotes
        }
      });
    } catch (error) {
      console.error('Error getting verification status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get verification status'
      });
    }
  }

  /**
   * Get pending verification requests (Admin only)
   */
  async getPendingVerifications(req, res) {
    try {
      const { userId, role } = req.user;

      const { page = 1, limit = 10 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const pendingRequests = await User.find({
        verificationStatus: 'pending'
      })
      .select('name email role bio specialization location verificationDocuments verificationNotes createdAt')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

      const totalCount = await User.countDocuments({
        verificationStatus: 'pending'
      });

      res.json({
        success: true,
        pendingRequests,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / parseInt(limit)),
          totalCount,
          hasMore: skip + pendingRequests.length < totalCount
        }
      });
    } catch (error) {
      console.error('Error getting pending verifications:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get pending verifications'
      });
    }
  }

  /**
   * Approve or reject verification (Admin only)
   */
  async reviewVerification(req, res) {
    try {
      const { userId: adminId, role } = req.user;
      const { targetUserId } = req.params;
      const { action, notes } = req.body; // action: 'approve' or 'reject'

      if (!['approve', 'reject'].includes(action)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid action. Must be "approve" or "reject"'
        });
      }

      const user = await User.findById(targetUserId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (user.verificationStatus !== 'pending') {
        return res.status(400).json({
          success: false,
          message: 'No pending verification request for this user'
        });
      }

      // Update verification status
      if (action === 'approve') {
        user.isVerified = true;
        user.verificationStatus = 'approved';
        user.verifiedAt = new Date();
        user.verifiedBy = adminId;
      } else {
        user.verificationStatus = 'rejected';
        user.isVerified = false;
      }

      user.verificationNotes = notes || '';
      await user.save();

      res.json({
        success: true,
        message: `Verification ${action}ed successfully`,
        user: {
          id: user._id,
          name: user.name,
          isVerified: user.isVerified,
          verificationStatus: user.verificationStatus
        }
      });
    } catch (error) {
      console.error('Error reviewing verification:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to review verification'
      });
    }
  }

  /**
   * Get all verified artists
   */
  async getVerifiedArtists(req, res) {
    try {
      const { page = 1, limit = 20, specialization, location } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Build query
      const query = {
        isVerified: true,
        role: 'Artist'
      };

      if (specialization) {
        query.specialization = { $regex: specialization, $options: 'i' };
      }

      if (location) {
        query.location = { $regex: location, $options: 'i' };
      }

      const verifiedArtists = await User.find(query)
        .select('name email bio specialization location avatar coverImage verifiedAt socialLinks')
        .populate('followers', 'name')
        .sort({ verifiedAt: -1 })
        .limit(parseInt(limit))
        .skip(skip);

      const totalCount = await User.countDocuments(query);

      // Add follower count to each artist
      const artistsWithCounts = verifiedArtists.map(artist => ({
        ...artist.toObject(),
        followerCount: artist.followers.length,
        followers: undefined // Remove full followers list for performance
      }));

      res.json({
        success: true,
        verifiedArtists: artistsWithCounts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / parseInt(limit)),
          totalCount,
          hasMore: skip + verifiedArtists.length < totalCount
        }
      });
    } catch (error) {
      console.error('Error getting verified artists:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get verified artists'
      });
    }
  }

  /**
   * Get verification statistics (Admin only)
   */
  async getVerificationStats(req, res) {
    try {
      const { role } = req.user;

      const stats = await User.aggregate([
        {
          $match: { role: 'Artist' }
        },
        {
          $group: {
            _id: '$verificationStatus',
            count: { $sum: 1 }
          }
        }
      ]);

      const totalArtists = await User.countDocuments({ role: 'Artist' });
      const verifiedCount = await User.countDocuments({ 
        role: 'Artist', 
        isVerified: true 
      });

      const verificationStats = {
        totalArtists,
        verifiedCount,
        verificationRate: totalArtists > 0 ? (verifiedCount / totalArtists * 100).toFixed(1) : 0,
        statusBreakdown: {}
      };

      // Format status breakdown
      stats.forEach(stat => {
        verificationStats.statusBreakdown[stat._id] = stat.count;
      });

      res.json({
        success: true,
        stats: verificationStats
      });
    } catch (error) {
      console.error('Error getting verification stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get verification statistics'
      });
    }
  }
}

module.exports = new VerificationController();
