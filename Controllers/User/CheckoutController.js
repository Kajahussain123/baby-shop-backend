const Checkout = require('../../Models/User/CheckoutModel');
const Cart = require('../../Models/User/CartModel');

exports.initiateCheckout = async (req, res) => {
    try {
        const { userId, cartId } = req.body;

        // Validate cart
        const cart = await Cart.findById(cartId).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty, cannot proceed with checkout' });
        }

        // Calculate total amount
        let totalAmount = 0;
        cart.items.forEach((item) => {
            const price = item.product.offerPrice || item.product.actualPrice;
            totalAmount += price * item.quantity;
        });

        // Create a checkout record
        const checkout = new Checkout({
            user: userId,
            cart: cartId,
            totalAmount,
        });

        await checkout.save();

        res.status(201).json({ message: 'Checkout initiated successfully', checkout });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getCheckoutDetails = async (req, res) => {
    try {
        const { checkoutId } = req.params;

        const checkout = await Checkout.findById(checkoutId)
            .populate('user')
            .populate({
                path: 'cart',
                populate: {
                    path: 'items.product', // This will populate the product within each item
                    model: 'Product', // Specify the model to populate from
                },
            });

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        // Calculate the total amount
        let totalAmount = 0;
        checkout.cart.items.forEach((item) => {
            const price = item.product.offerPrice || item.product.actualPrice;
            totalAmount += price * item.quantity;
        });

        // Update the totalAmount field
        checkout.totalAmount = totalAmount;

        await checkout.save();

        res.status(200).json({ checkout });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.deleteCheckout = async (req, res) => {
    try {
        const { checkoutId } = req.params;

        const checkout = await Checkout.findByIdAndDelete(checkoutId);
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        res.status(200).json({ message: 'Checkout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
