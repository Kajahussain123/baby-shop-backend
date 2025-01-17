const express = require('express');
const router = express.Router();
const UserController = require('../../Controllers/User/Auth');

// Register Route
router.post('/register', UserController.register);

// Login Route
router.post('/login', UserController.login);

module.exports = router;
