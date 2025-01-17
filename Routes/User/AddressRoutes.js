const express = require('express');
const router = express.Router();
const AddressController = require('../../Controllers/User/AddressController');

// Add an address for a user
router.post('/user/:userId/address', AddressController.addAddress);

// Get all addresses for a user
router.get('/user/:userId/addresses', AddressController.getAddresses);

// Delete an address
router.delete('/user/:userId/address/:addressId', AddressController.deleteAddress);

// Update an address
router.put('/user/:userId/address/:addressId', AddressController.updateAddress);

module.exports = router;
