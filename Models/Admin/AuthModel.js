const mongoose = require('mongoose');

// User Schema
const adminSchema = new mongoose.Schema({
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
    
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
