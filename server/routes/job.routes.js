const express = require('express');
const { body, param } = require('express-validator');
const {
  listJobs,
  createJob,
  applyToJob,
  employerDashboard
} = require('../controllers/job.controller');
const validate = require('../middleware/validate.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

const jobValidation = [
  body('title').trim().isLength({ min: 3, max: 120 }),
  body('company').trim().isLength({ min: 2, max: 120 }),
  body('description').trim().isLength({ min: 20, max: 3000 }),
  body('category').isIn(['engineering', 'design', 'marketing', 'education', 'operations', 'support']),
  body('employmentType').optional().isIn(['full-time', 'part-time', 'contract', 'internship'])
];

router.get('/', listJobs);
router.post('/', protect, authorize('employer', 'admin'), jobValidation, validate, createJob);
router.post('/:id/apply', protect, param('id').isMongoId(), validate, upload.single('cv'), applyToJob);
router.get('/dashboard/employer', protect, authorize('employer', 'admin'), employerDashboard);

module.exports = router;
