const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: ['workshop', 'event', 'exhibition', 'performance'],
    default: 'event'
  },
  category: {
    type: String,
    required: true,
    enum: ['music', 'dance', 'art', 'crafts', 'general'],
    default: 'general'
  },
  date: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  time: {
    type: String,
    required: true
  },
  location: {
    venue: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  instructor: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  maxParticipants: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  contactEmail: {
    type: String
  },
  contactPhone: {
    type: String
  },
  tags: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);
