const express = require('express');
const router = express.Router();
const CategoryController = require('../../Controllers/User/CategoryController');

// Get all categories
router.get('/view', CategoryController.getCategories);

// Get a specific category by ID
router.get('/:id', CategoryController.getCategoryById);


module.exports = router;
