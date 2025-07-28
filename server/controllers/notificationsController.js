const User = require('../models/User');

class NotificationsController {
  /**
   * Get user's notifications
   */
  async getNotifications(req, res) {
    try {
      const { userId } = req.user;
      const { page = 1, limit = 20 } = req.query;

      const user = await User.findById(userId)
        .populate('notifications.from', 'name avatar')
        .select('notifications');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Sort notifications by creation date (newest first)
      const sortedNotifications = user.notifications
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice((page - 1) * limit, page * limit);

      // Count unread notifications
      const unreadCount = user.notifications.filter(n => !n.read).length;

      res.json({
        success: true,
        notifications: sortedNotifications,
        unreadCount,
        totalCount: user.notifications.length,
        currentPage: parseInt(page),
        totalPages: Math.ceil(user.notifications.length / limit)
      });
    } catch (error) {
      console.error('Error getting notifications:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get notifications'
      });
    }
  }

  /**
   * Mark notification as read
   */
  async markAsRead(req, res) {
    try {
      const { userId } = req.user;
      const { notificationId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const notification = user.notifications.id(notificationId);
      if (!notification) {
        return res.status(404).json({
          success: false,
          message: 'Notification not found'
        });
      }

      notification.read = true;
      await user.save();

      res.json({
        success: true,
        message: 'Notification marked as read'
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark notification as read'
      });
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(req, res) {
    try {
      const { userId } = req.user;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Mark all notifications as read
      user.notifications.forEach(notification => {
        notification.read = true;
      });

      await user.save();

      res.json({
        success: true,
        message: 'All notifications marked as read'
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to mark all notifications as read'
      });
    }
  }

  /**
   * Delete a notification
   */
  async deleteNotification(req, res) {
    try {
      const { userId } = req.user;
      const { notificationId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Remove the notification
      user.notifications = user.notifications.filter(
        n => n._id.toString() !== notificationId
      );

      await user.save();

      res.json({
        success: true,
        message: 'Notification deleted'
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete notification'
      });
    }
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(req, res) {
    try {
      const { userId } = req.user;

      const user = await User.findById(userId).select('notifications');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const unreadCount = user.notifications.filter(n => !n.read).length;

      res.json({
        success: true,
        unreadCount
      });
    } catch (error) {
      console.error('Error getting unread count:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get unread count'
      });
    }
  }
}

module.exports = new NotificationsController();
