const mongoose = require('mongoose');

// Carousel Schema
const carouselSchema = new mongoose.Schema({
    image: {
        type: String, // URL or file path of the image
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String, // Link for the carousel item (optional)
        required: false,
    },
    is_active: {
        type: Boolean,
        default: true, // Whether the carousel item is active
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Model
const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = Carousel;
