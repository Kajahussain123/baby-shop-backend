const mongoose = require('mongoose');

// Address Schema
const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false, // Indicates if this is the default address
    },
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Model
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
