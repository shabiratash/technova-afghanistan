const express = require('express');
const { technologyNews } = require('../controllers/integration.controller');

const router = express.Router();

router.get('/technology-news', technologyNews);

module.exports = router;
