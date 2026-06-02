const express = require('express');
const { body, param } = require('express-validator');
const {
  listCourses,
  courseDetails,
  createCourse,
  enroll
} = require('../controllers/course.controller');
const validate = require('../middleware/validate.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', listCourses);
router.get('/:id', param('id').isMongoId(), validate, courseDetails);
router.post(
  '/',
  protect,
  authorize('provider', 'admin'),
  [
    body('title').trim().isLength({ min: 3 }),
    body('description').trim().isLength({ min: 20 }),
    body('category').isIn(['programming', 'networking', 'business', 'design', 'cybersecurity', 'cloud']),
    body('level').optional().isIn(['beginner', 'intermediate', 'advanced']),
    body('price').optional().isFloat({ min: 0 }),
    body('lessons').optional().isArray()
  ],
  validate,
  createCourse
);
router.post('/:id/enroll', protect, param('id').isMongoId(), validate, enroll);

module.exports = router;
