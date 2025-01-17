const express = require('express');
const router = express.Router();
const CategoryController = require('../../Controllers/Admin/CategoryController');

// Add a new category
router.post('/add', CategoryController.addCategory);

// Get all categories
router.get('/view', CategoryController.getCategories);

// Get a specific category by ID
router.get('/:id', CategoryController.getCategoryById);

// Edit a category by ID
router.patch('/edit/:id', CategoryController.updateCategory);

// Delete a category by ID
router.delete('/delete/:id', CategoryController.deleteCategory);

module.exports = router;
