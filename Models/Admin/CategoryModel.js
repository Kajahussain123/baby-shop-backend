const mongoose = require('mongoose');

// Schema for category
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate category names
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL or path to the category image (if any)
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Model for category
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
