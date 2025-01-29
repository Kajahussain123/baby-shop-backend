const express = require('express');
const router = express.Router();
const OrderController = require('../../Controllers/Admin/OrderController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Create an order
router.post('/',jwtVerify(['admin']), OrderController.createOrder);

// Get all orders for a user
router.get('/user/:userId',jwtVerify(['admin']), OrderController.getUserOrders);

// Get order details
router.get('/:orderId',jwtVerify(['admin']), OrderController.getOrderDetails);

// Update order status
router.patch('/:orderId/status',jwtVerify(['admin']), OrderController.updateOrderStatus);

// Admin: Get all orders
router.get('/orders',jwtVerify(['admin']), OrderController.getAllOrders);

module.exports = router;
