const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    coverLetter: {
      type: String,
      maxlength: 2000,
      default: ''
    },
    cvUrl: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['submitted', 'reviewed', 'shortlisted', 'rejected'],
      default: 'submitted'
    }
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 3000
    },
    category: {
      type: String,
      required: true,
      enum: ['engineering', 'design', 'marketing', 'education', 'operations', 'support']
    },
    location: {
      type: String,
      default: 'Remote / Afghanistan'
    },
    salaryRange: {
      type: String,
      default: 'Negotiable'
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      default: 'full-time'
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    applications: [applicationSchema],
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open'
    }
  },
  { timestamps: true }
);

jobSchema.index({ title: 'text', company: 'text', description: 'text' });

module.exports = mongoose.model('Job', jobSchema);
