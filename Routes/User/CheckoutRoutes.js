const express = require('express');
const router = express.Router();
const CheckoutController = require('../../Controllers/User/CheckoutController');

// Initiate checkout
router.post('/create', CheckoutController.initiateCheckout);

// Get checkout details
router.get('/view/:checkoutId', CheckoutController.getCheckoutDetails);

// Delete checkout
router.delete('/:checkoutId', CheckoutController.deleteCheckout);

module.exports = router;
