const express = require('express');
const router = express.Router();
const OrderController = require('../../Controllers/User/OrderController');

// Create an order
router.post('/create', OrderController.createOrder);

// Get all orders for a user
router.get('/user/:userId', OrderController.getUserOrders);

// Get order details
router.get('/:orderId', OrderController.getOrderDetails);


module.exports = router;
