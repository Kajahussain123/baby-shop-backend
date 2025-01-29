const express = require('express');
const router = express.Router();
const WishlistController = require('../../Controllers/User/WishlistController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Add a product to the wishlist
router.post('/add',jwtVerify(['user']), WishlistController.addToWishlist);

// Remove a product from the wishlist
router.post('/remove',jwtVerify(['user']), WishlistController.removeFromWishlist);

// Get a user's wishlist
router.get('/view/:userId',jwtVerify(['user']), WishlistController.getWishlist);

module.exports = router;
