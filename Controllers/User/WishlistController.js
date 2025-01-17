const Wishlist = require('../../Models/User/WishlistModel');
const Product = require('../../Models/Admin/ProductModel');

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Validate the product ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the user's wishlist or create a new one
        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        // Check if the product is already in the wishlist
        if (wishlist.products.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        // Add the product to the wishlist
        wishlist.products.push(productId);
        await wishlist.save();

        res.status(200).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find the user's wishlist
        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Remove the product from the wishlist
        wishlist.products = wishlist.products.filter(
            (product) => product.toString() !== productId
        );
        await wishlist.save();

        res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user's wishlist
        const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
