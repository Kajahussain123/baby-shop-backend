const express = require('express');
const { register, login } = require('../../Controllers/Admin/AuthController');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;
