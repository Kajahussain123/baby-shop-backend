const express = require('express');
const router = express.Router();
const AdminUserController = require('../../Controllers/Admin/UserController');

// Admin route to get all users with their addresses
router.get('/viewall', AdminUserController.getAllUsers);

// Admin route to delete a user by their ID
router.delete('/delete:userId', AdminUserController.deleteUser);

module.exports = router;
