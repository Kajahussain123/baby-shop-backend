const mongoose = require('mongoose');

// Wishlist Schema
const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Model
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
