const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address', // Reference to the Address model
    }],
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;
