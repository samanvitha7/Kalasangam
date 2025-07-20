const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportType: {
    type: String,
    enum: ['artist', 'artwork'],
    required: true
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.reportType === 'artist';
    }
  },
  reportedArtwork: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Art',
    required: function() {
      return this.reportType === 'artwork';
    }
  },
  reason: {
    type: String,
    enum: [
      'inappropriate_content',
      'copyright_violation',
      'spam',
      'harassment',
      'fake_profile',
      'violence',
      'hate_speech',
      'other'
    ],
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient querying
reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ reportType: 1, status: 1 });
reportSchema.index({ reporter: 1 });
reportSchema.index({ reportedUser: 1 });
reportSchema.index({ reportedArtwork: 1 });

module.exports = mongoose.model('Report', reportSchema);
