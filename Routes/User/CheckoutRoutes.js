const express = require('express');
const router = express.Router();
const CheckoutController = require('../../Controllers/User/CheckoutController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Initiate checkout
router.post('/create',jwtVerify(['user']), CheckoutController.initiateCheckout);

// Get checkout details
router.get('/view/:checkoutId',jwtVerify(['user']), CheckoutController.getCheckoutDetails);

// Delete checkout
router.delete('/:checkoutId',jwtVerify(['user']), CheckoutController.deleteCheckout);

module.exports = router;
