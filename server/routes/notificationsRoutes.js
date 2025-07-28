const express = require('express');
const notificationsController = require('../controllers/notificationsController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All notification routes require authentication
router.get('/', auth, (req, res) => notificationsController.getNotifications(req, res));
router.get('/unread-count', auth, (req, res) => notificationsController.getUnreadCount(req, res));
router.put('/:notificationId/read', auth, (req, res) => notificationsController.markAsRead(req, res));
router.put('/mark-all-read', auth, (req, res) => notificationsController.markAllAsRead(req, res));
router.delete('/:notificationId', auth, (req, res) => notificationsController.deleteNotification(req, res));

module.exports = router;
