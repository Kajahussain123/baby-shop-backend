const Order = require('../../Models/User/OrderModel');
const Checkout = require('../../Models/User/CheckoutModel');

exports.createOrder = async (req, res) => {
    try {
        const { userId, checkoutId, addressId, paymentMethod } = req.body;

        // Validate the checkout details
        const checkout = await Checkout.findById(checkoutId).populate('cart');
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        // Map items from cart to order items
        const items = checkout.cart.items.map((item) => ({
            product: item.product,
            quantity: item.quantity,
        }));

        // Create an order
        const order = new Order({
            user: userId,
            items,
            totalAmount: checkout.totalAmount,
            address: addressId,
            paymentMethod,
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user: userId }).populate('items.product address');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate('items.product')
            .populate('user')
            .populate('address');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



