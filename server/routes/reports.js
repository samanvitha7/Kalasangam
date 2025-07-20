const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const {
  submitReport,
  getAllReports,
  updateReportStatus,
  getUserReports,
  getReportStats
} = require('../controllers/reportController');

// Submit a new report (authenticated users only)
router.post('/', auth, submitReport);

// Get user's own reports
router.get('/my-reports', auth, getUserReports);

// Admin routes
router.get('/', auth, adminOnly, getAllReports);
router.put('/:reportId/status', auth, adminOnly, updateReportStatus);
router.get('/stats', auth, adminOnly, getReportStats);

module.exports = router;
