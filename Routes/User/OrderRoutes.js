const express = require('express');
const router = express.Router();
const OrderController = require('../../Controllers/User/OrderController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Create an order
router.post('/create',jwtVerify(['user']), OrderController.createOrder);

// Get all orders for a user
router.get('/user/:userId',jwtVerify(['user']), OrderController.getUserOrders);

// Get order details
router.get('/:orderId',jwtVerify(['user']), OrderController.getOrderDetails);


module.exports = router;
