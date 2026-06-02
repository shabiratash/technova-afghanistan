const express = require('express');
const { param } = require('express-validator');
const {
  analytics,
  users,
  deactivateUser,
  manageServices,
  manageJobs
} = require('../controllers/admin.controller');
const validate = require('../middleware/validate.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/analytics', analytics);
router.get('/users', users);
router.put('/users/:id/deactivate', param('id').isMongoId(), validate, deactivateUser);
router.get('/services', manageServices);
router.get('/jobs', manageJobs);

module.exports = router;
