const express = require('express');
const router = express.Router();
const ProductController = require('../../Controllers/Admin/ProductController');

// Add a new product
router.post('/add', ProductController.addProduct);

// Get all products
router.get('/all', ProductController.getProducts);

// Get a specific product by ID
router.get('/view/:id', ProductController.getProductById);

// Edit a product by ID
router.patch('/edit/:id', ProductController.updateProduct);

// Delete a product by ID
router.delete('/delete/:id', ProductController.deleteProduct);

module.exports = router;
