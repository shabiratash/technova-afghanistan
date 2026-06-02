const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    category: {
      type: String,
      required: true,
      enum: ['web-development', 'mobile-apps', 'cybersecurity', 'cloud', 'ai', 'design', 'training', 'support']
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    location: {
      type: String,
      default: 'Afghanistan'
    },
    tags: [String],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    status: {
      type: String,
      enum: ['active', 'paused'],
      default: 'active'
    }
  },
  { timestamps: true }
);

serviceSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Service', serviceSchema);
