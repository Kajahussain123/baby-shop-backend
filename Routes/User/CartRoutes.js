const express = require('express');
const router = express.Router();
const CartController = require('../../Controllers/User/CartController');

// Add or update a product in the cart
router.post('/add', CartController.addToCart);

// Remove a product from the cart
router.post('/remove', CartController.removeFromCart);

// Get a user's cart
router.get('/get/:userId', CartController.getCart);

// Clear the cart
router.post('/clear', CartController.clearCart);

module.exports = router;
