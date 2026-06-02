const express = require('express');
const { body, param } = require('express-validator');
const {
  listServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/service.controller');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

const serviceValidation = [
  body('title').trim().isLength({ min: 3, max: 120 }).withMessage('Title must be 3-120 characters'),
  body('description').trim().isLength({ min: 20, max: 2000 }).withMessage('Description must be 20-2000 characters'),
  body('category').isIn(['web-development', 'mobile-apps', 'cybersecurity', 'cloud', 'ai', 'design', 'training', 'support']),
  body('price').isFloat({ min: 0 }).withMessage('Price must be zero or greater'),
  body('tags').optional().isArray()
];

router.get('/', listServices);
router.post('/', protect, serviceValidation, validate, createService);
router.put('/:id', protect, [param('id').isMongoId(), ...serviceValidation], validate, updateService);
router.delete('/:id', protect, param('id').isMongoId(), validate, deleteService);

module.exports = router;
