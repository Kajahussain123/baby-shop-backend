const express = require('express');
const router = express.Router();
const WishlistController = require('../../Controllers/User/WishlistController');

// Add a product to the wishlist
router.post('/add', WishlistController.addToWishlist);

// Remove a product from the wishlist
router.post('/remove', WishlistController.removeFromWishlist);

// Get a user's wishlist
router.get('/view/:userId', WishlistController.getWishlist);

module.exports = router;
