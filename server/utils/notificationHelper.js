const User = require('../models/User');

/**
 * Utility class for creating and managing notifications
 */
class NotificationHelper {
  /**
   * Create a notification for a user
   * @param {string} recipientUserId - User ID who will receive the notification
   * @param {string} fromUserId - User ID who triggered the notification
   * @param {string} type - Type of notification ('follow', 'like', 'bookmark', 'artwork_upload', 'verification_approved')
   * @param {string} message - Custom message for the notification
   */
  static async createNotification(recipientUserId, fromUserId, type, message) {
    try {
      // Don't create notification if user is notifying themselves
      if (recipientUserId === fromUserId) {
        return { success: true, message: 'Self-notification skipped' };
      }

      const recipient = await User.findById(recipientUserId);
      if (!recipient) {
        console.error('Recipient user not found:', recipientUserId);
        return { success: false, message: 'Recipient user not found' };
      }

      // Check if a similar notification already exists (to prevent spam)
      const existingNotification = recipient.notifications.find(
        n => n.from.toString() === fromUserId && 
             n.type === type && 
             n.message === message &&
             Date.now() - new Date(n.createdAt).getTime() < 24 * 60 * 60 * 1000 // Within last 24 hours
      );

      if (existingNotification) {
        return { success: true, message: 'Duplicate notification prevented' };
      }

      // Create the notification
      const notification = {
        type,
        from: fromUserId,
        message,
        read: false,
        createdAt: new Date()
      };

      recipient.notifications.push(notification);
      await recipient.save();

      return { success: true, message: 'Notification created successfully' };
    } catch (error) {
      console.error('Error creating notification:', error);
      return { success: false, message: 'Failed to create notification' };
    }
  }

  /**
   * Create a follow notification
   * @param {string} recipientUserId - User being followed
   * @param {string} followerUserId - User who followed
   * @param {string} followerName - Name of the follower
   */
  static async createFollowNotification(recipientUserId, followerUserId, followerName) {
    return await this.createNotification(
      recipientUserId,
      followerUserId,
      'follow',
      `${followerName} started following you!`
    );
  }

  /**
   * Create a like notification
   * @param {string} recipientUserId - Owner of the liked content
   * @param {string} likerUserId - User who liked
   * @param {string} likerName - Name of the liker
   * @param {string} contentType - Type of content liked (artwork, post, etc.)
   */
  static async createLikeNotification(recipientUserId, likerUserId, likerName, contentType = 'artwork') {
    return await this.createNotification(
      recipientUserId,
      likerUserId,
      'like',
      `${likerName} liked your ${contentType}`
    );
  }

  /**
   * Create a bookmark notification
   * @param {string} recipientUserId - Owner of the bookmarked content
   * @param {string} bookmarkerUserId - User who bookmarked
   * @param {string} bookmarkerName - Name of the bookmarker
   * @param {string} contentType - Type of content bookmarked
   */
  static async createBookmarkNotification(recipientUserId, bookmarkerUserId, bookmarkerName, contentType = 'artwork') {
    return await this.createNotification(
      recipientUserId,
      bookmarkerUserId,
      'bookmark',
      `${bookmarkerName} bookmarked your ${contentType}`
    );
  }

  /**
   * Create an artwork upload notification for followers
   * @param {string} artistUserId - Artist who uploaded
   * @param {string} artistName - Name of the artist
   * @param {string} artworkTitle - Title of the artwork
   */
  static async createArtworkUploadNotification(artistUserId, artistName, artworkTitle) {
    try {
      const artist = await User.findById(artistUserId).populate('followers');
      
      if (!artist || !artist.followers || artist.followers.length === 0) {
        return { success: true, message: 'No followers to notify' };
      }

      // Create notifications for all followers
      const promises = artist.followers.map(follower => 
        this.createNotification(
          follower._id,
          artistUserId,
          'artwork_upload',
          `${artistName} uploaded a new artwork: "${artworkTitle}"`
        )
      );

      await Promise.all(promises);
      
      return { 
        success: true, 
        message: `Notified ${artist.followers.length} followers about new artwork` 
      };
    } catch (error) {
      console.error('Error creating artwork upload notifications:', error);
      return { success: false, message: 'Failed to create artwork upload notifications' };
    }
  }

  /**
   * Create a verification approved notification
   * @param {string} recipientUserId - User who got verified
   * @param {string} adminUserId - Admin who approved
   * @param {string} adminName - Name of the admin
   */
  static async createVerificationApprovedNotification(recipientUserId, adminUserId, adminName) {
    return await this.createNotification(
      recipientUserId,
      adminUserId,
      'verification_approved',
      `Congratulations! Your account has been verified by ${adminName}`
    );
  }

  /**
   * Bulk delete old notifications (cleanup utility)
   * @param {number} daysOld - Delete notifications older than this many days
   */
  static async cleanupOldNotifications(daysOld = 30) {
    try {
      const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
      
      const result = await User.updateMany(
        {},
        {
          $pull: {
            notifications: {
              createdAt: { $lt: cutoffDate }
            }
          }
        }
      );

      return {
        success: true,
        message: `Cleaned up old notifications for ${result.modifiedCount} users`
      };
    } catch (error) {
      console.error('Error cleaning up old notifications:', error);
      return { success: false, message: 'Failed to cleanup old notifications' };
    }
  }
}

module.exports = NotificationHelper;
