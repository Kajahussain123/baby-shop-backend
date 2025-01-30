const express = require('express');
const router = express.Router();
const OrderController = require('../../Controllers/Admin/OrderController');
const jwtVerify = require('../../Middlewares/jwtMiddleware');

// Admin: Get all orders
router.get('/all', jwtVerify(['admin']), OrderController.getAllOrders);

// Get order details
router.get('/:orderId', jwtVerify(['admin']), OrderController.getOrderDetails);

// Update order status
router.patch('/:orderId/status', jwtVerify(['admin']), OrderController.updateOrderStatus);

module.exports = router;