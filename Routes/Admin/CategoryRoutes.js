const express = require('express');
const router = express.Router();
const CategoryController = require('../../Controllers/Admin/CategoryController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')



// Add a new category
router.post('/add',jwtVerify(['admin']), CategoryController.addCategory);

// Get all categories
router.get('/view',jwtVerify(['admin']), CategoryController.getCategories);

// Get a specific category by ID
router.get('/:id',jwtVerify(['admin']), CategoryController.getCategoryById);

// Edit a category by ID
router.patch('/edit/:id',jwtVerify(['admin']), CategoryController.updateCategory);

// Delete a category by ID
router.delete('/delete/:id',jwtVerify(['admin']), CategoryController.deleteCategory);

module.exports = router;
