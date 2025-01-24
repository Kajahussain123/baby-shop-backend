const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Referencing the Category model
        required: true,
    },
    is_offerProduct: {
        type: Boolean,
        default: false, // Whether the product is an offer product
    },
    is_popularProduct: {
        type: Boolean,
        default: false, // Whether the product is popular
    },
    is_mainProduct: {
        type: Boolean,
        default: true, // Whether the product is a main product
    },
    actualPrice: {
        type: Number,
        required: true, // The actual price of the product
    },
    offerPrice: {
        type: Number,
        required: false, // Optional, offer price if available
    },
    discount: {
        type: Number,
        required: false, // Optional, the discount percentage
    },
    stock: {
        type: Number,
        required: true,
    },
    images: [
        {
            type: String, // Store image URLs or file paths for product images
            required: false,
        },
    ],
    sizes: [
        {
            ageRange: {
                type: String, // e.g., "0-3 months", "3-6 months"
                required: true,
            },
            stock: {
                type: Number,
                required: true, // Stock available for this specific size
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
