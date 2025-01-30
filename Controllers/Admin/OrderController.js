const Order = require('../../Models/User/OrderModel');

exports.getAllOrders = async (req, res) => {
    try {
        // Fetch all orders
        const orders = await Order.find()
            .populate('user', 'name email') // Populate user details
            .populate('items.product', 'name price') // Populate product details
            .populate('address', 'street city state zip'); // Populate address details

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Validate the new status
        const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        // Find and update the order status
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Fetch order details with all necessary fields
        const order = await Order.findById(orderId)
            .populate('user', 'name email')
            .populate('items.product', 'name price description')
            .populate('address', 'street city state zip');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
