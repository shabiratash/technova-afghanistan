const express = require('express');
const { param } = require('express-validator');
const { conversation } = require('../controllers/chat.controller');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/:userId', protect, param('userId').isMongoId(), validate, conversation);

module.exports = router;
