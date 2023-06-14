const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// category routes
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);

module.exports = router;