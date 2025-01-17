const express = require('express');
const router = express.Router();
const OrderController = require('../../Controllers/Admin/OrderController');

// Create an order
router.post('/', OrderController.createOrder);

// Get all orders for a user
router.get('/user/:userId', OrderController.getUserOrders);

// Get order details
router.get('/:orderId', OrderController.getOrderDetails);

// Update order status
router.patch('/:orderId/status', OrderController.updateOrderStatus);

// Admin: Get all orders
router.get('/orders', OrderController.getAllOrders);

module.exports = router;
