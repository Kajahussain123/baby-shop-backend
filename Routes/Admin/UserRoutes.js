const express = require('express');
const router = express.Router();
const AdminUserController = require('../../Controllers/Admin/UserController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Admin route to get all users with their addresses
router.get('/viewall',jwtVerify(['admin']), AdminUserController.getAllUsers);

// Admin route to delete a user by their ID
router.delete('/delete:userId',jwtVerify(['admin']), AdminUserController.deleteUser);

module.exports = router;
