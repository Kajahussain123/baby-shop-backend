const express = require('express');
const router = express.Router();
const AddressController = require('../../Controllers/User/AddressController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Add an address for a user
router.post('/user/:userId/address',jwtVerify(['user']), AddressController.addAddress);

// Get all addresses for a user
router.get('/user/:userId/addresses',jwtVerify(['user']), AddressController.getAddresses);

// Delete an address
router.delete('/user/:userId/address/:addressId',jwtVerify(['user']), AddressController.deleteAddress);

// Update an address
router.put('/user/:userId/address/:addressId',jwtVerify(['user']), AddressController.updateAddress);

module.exports = router;
