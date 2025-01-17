const mongoose = require('mongoose');

// Brand Schema
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure brand name is unique
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,  // Store image URL or path for the brand's logo
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Model
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
