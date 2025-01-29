const express = require('express');
const router = express.Router();
const CartController = require('../../Controllers/User/CartController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Add or update a product in the cart
router.post('/add',jwtVerify(['user']), CartController.addToCart);

// Remove a product from the cart
router.post('/remove',jwtVerify(['user']), CartController.removeFromCart);

// Get a user's cart 
router.get('/get/:userId',jwtVerify(['user']), CartController.getCart);

// Clear the cart
router.post('/clear',jwtVerify(['user']), CartController.clearCart);

module.exports = router;
