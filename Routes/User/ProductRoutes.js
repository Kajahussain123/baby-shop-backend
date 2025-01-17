const express = require('express');
const router = express.Router();
const ProductController = require('../../Controllers/User/ProductController');

// Get all products
router.get('/view', ProductController.getProducts);

// Get a specific product by ID
router.get('/view/:id', ProductController.getProductById);

// Get products by category
router.get('/category/:categoryId', ProductController.getProductsByCategory);

module.exports = router;
