const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Painting', 'Sculpture', 'Dance', 'Music', 'Craft', 'Traditional Art', 'Other']
  },
  artform: {
    type: String, // e.g., "Bharatanatyam", "Madhubani", "Kathak", etc.
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artist: {
    type: String,
    required: true // Artist name for easy access
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
artworkSchema.index({ userId: 1 });
artworkSchema.index({ category: 1 });
artworkSchema.index({ createdAt: -1 });
artworkSchema.index({ isPublic: 1, isActive: 1 });

// Virtual for like count
artworkSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for bookmark count
artworkSchema.virtual('bookmarkCount').get(function() {
  return this.bookmarks ? this.bookmarks.length : 0;
});

// Virtual for comment count
artworkSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

// Ensure virtual fields are serialized
artworkSchema.set('toJSON', { virtuals: true });
artworkSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Artwork", artworkSchema);
