const Report = require('../models/Report');
const User = require('../models/User');
const Art = require('../models/Art');

// Submit a new report
const submitReport = async (req, res) => {
  try {
    const { reportType, reportedUserId, reportedArtworkId, reason, description } = req.body;
    
    // Validate required fields
    if (!reportType || !reason || !description) {
      return res.status(400).json({ 
        message: 'Report type, reason, and description are required' 
      });
    }

    // Validate report type and corresponding ID
    if (reportType === 'artist' && !reportedUserId) {
      return res.status(400).json({ 
        message: 'Reported user ID is required for artist reports' 
      });
    }

    if (reportType === 'artwork' && !reportedArtworkId) {
      return res.status(400).json({ 
        message: 'Reported artwork ID is required for artwork reports' 
      });
    }

    // Verify reported user/artwork exists
    if (reportType === 'artist') {
      const reportedUser = await User.findById(reportedUserId);
      if (!reportedUser) {
        return res.status(404).json({ message: 'Reported user not found' });
      }
    }

    if (reportType === 'artwork') {
      const reportedArtwork = await Art.findById(reportedArtworkId);
      if (!reportedArtwork) {
        return res.status(404).json({ message: 'Reported artwork not found' });
      }
    }

    // Check if user has already reported this same item
    const existingReport = await Report.findOne({
      reporter: req.user.id,
      reportType,
      ...(reportType === 'artist' ? { reportedUser: reportedUserId } : { reportedArtwork: reportedArtworkId }),
      status: { $in: ['pending', 'reviewed'] }
    });

    if (existingReport) {
      return res.status(400).json({ 
        message: 'You have already submitted a report for this item' 
      });
    }

    // Create new report
    const report = new Report({
      reporter: req.user.id,
      reportType,
      ...(reportType === 'artist' ? { reportedUser: reportedUserId } : { reportedArtwork: reportedArtworkId }),
      reason,
      description: description.trim()
    });

    await report.save();

    res.status(201).json({
      message: 'Report submitted successfully',
      report: {
        id: report._id,
        reportType: report.reportType,
        reason: report.reason,
        status: report.status,
        createdAt: report.createdAt
      }
    });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ message: 'Failed to submit report' });
  }
};

// Get all reports (Admin only)
const getAllReports = async (req, res) => {
  try {
    const { status, reportType, page = 1, limit = 20 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (reportType) filter.reportType = reportType;

    const reports = await Report.find(filter)
      .populate('reporter', 'username email')
      .populate('reportedUser', 'username email role')
      .populate('reportedArtwork', 'title description images')
      .populate('reviewedBy', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Transform reports to match client expectations
    const transformedReports = reports.map(report => ({
      _id: report._id,
      reason: report.reason,
      status: report.status,
      targetType: report.reportType,
      targetArtist: report.reportedUser || null,
      description: report.description,
      reportedBy: {
        name: report.reporter?.username || 'Unknown User'
      },
      createdAt: report.createdAt,
      adminNotes: report.adminNotes || '',
      reviewedAt: report.reviewedAt
    }));

    res.json(transformedReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};

// Update report status (Admin only)
const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, adminNotes } = req.body;

    if (!['pending', 'reviewed', 'resolved', 'dismissed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.status = status;
    if (adminNotes) report.adminNotes = adminNotes.trim();
    report.reviewedBy = req.user.id;
    report.reviewedAt = new Date();

    await report.save();

    const updatedReport = await Report.findById(reportId)
      .populate('reporter', 'username email')
      .populate('reportedUser', 'username email role')
      .populate('reportedArtwork', 'title description images')
      .populate('reviewedBy', 'username');

    res.json({
      message: 'Report updated successfully',
      report: updatedReport
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Failed to update report' });
  }
};

// Get user's own reports
const getUserReports = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const reports = await Report.find({ reporter: req.user.id })
      .populate('reportedUser', 'username')
      .populate('reportedArtwork', 'title images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalReports = await Report.countDocuments({ reporter: req.user.id });

    res.json({
      reports,
      totalPages: Math.ceil(totalReports / limit),
      currentPage: page,
      totalReports
    });
  } catch (error) {
    console.error('Error fetching user reports:', error);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};

// Get report statistics (Admin only)
const getReportStats = async (req, res) => {
  try {
    const stats = await Report.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Transform stats to match client expectations
    const statusMap = {
      pending: 0,
      approved: 0,
      rejected: 0,
      reviewed: 0,
      resolved: 0,
      dismissed: 0
    };

    stats.forEach(stat => {
      if (statusMap.hasOwnProperty(stat._id)) {
        statusMap[stat._id] = stat.count;
      }
    });

    // Calculate total
    const total = Object.values(statusMap).reduce((sum, count) => sum + count, 0);

    // Map 'reviewed'/'resolved' to 'approved' and 'dismissed' to 'rejected' for client
    const clientStats = {
      total: total,
      pending: statusMap.pending,
      approved: statusMap.reviewed + statusMap.resolved,
      rejected: statusMap.dismissed
    };

    res.json(clientStats);
  } catch (error) {
    console.error('Error fetching report stats:', error);
    res.status(500).json({ message: 'Failed to fetch report statistics' });
  }
};

module.exports = {
  submitReport,
  getAllReports,
  updateReportStatus,
  getUserReports,
  getReportStats
};
