const Cart = require('../../Models/User/CartModel');
const Product = require('../../Models/Admin/ProductModel');

// Add or update a product in the cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate the product ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the user's cart or create a new one
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product is already in the cart
        const productIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex >= 0) {
            // Update quantity if the product already exists
            cart.items[productIndex].quantity += quantity;
        } else {
            // Add new product to the cart
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product from the cart
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get user's cart with total price
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user's cart and populate product details
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Calculate total price for each item and overall total
        let totalPrice = 0;
        const cartItems = cart.items.map((item) => {
            const price = item.product.offerPrice || item.product.actualPrice; // Use offerPrice if available
            const itemTotal = price * item.quantity;
            totalPrice += itemTotal;

            return {
                product: item.product,
                quantity: item.quantity,
                itemTotal, // Total price for this item
            };
        });

        res.status(200).json({
            cartItems,
            totalPrice, // Overall total price
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Clear all items from the cart
        cart.items = [];
        await cart.save();

        res.status(200).json({ message: 'Cart cleared', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
