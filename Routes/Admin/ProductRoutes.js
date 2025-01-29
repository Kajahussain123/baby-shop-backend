const express = require('express');
const router = express.Router();
const ProductController = require('../../Controllers/Admin/ProductController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Add a new product
router.post('/add', jwtVerify(['admin']), ProductController.addProduct);

// Get all products
router.get('/all',jwtVerify(['admin']), ProductController.getProducts);

// Get a specific product by ID
router.get('/view/:id',jwtVerify(['admin']), ProductController.getProductById);

// Edit a product by ID
router.patch('/edit/:id',jwtVerify(['admin']), ProductController.updateProduct);

// Delete a product by ID
router.delete('/delete/:id',jwtVerify(['admin']), ProductController.deleteProduct);

module.exports = router;
