const express = require('express');
const router = express.Router();
const BrandController = require('../../Controllers/User/BrandController');


// Get all brands
router.get('/view', BrandController.getBrands);

// Get a specific brand by ID
router.get('/:id', BrandController.getBrandById);


module.exports = router;
