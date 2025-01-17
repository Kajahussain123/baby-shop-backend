const express = require('express');
const router = express.Router();
const BrandController = require('../../Controllers/Admin/BrandController');

// Add a new brand
router.post('/add', BrandController.addBrand);

// Get all brands
router.get('/view', BrandController.getBrands);

// Get a specific brand by ID
router.get('/:id', BrandController.getBrandById);

// Edit a brand by ID
router.patch('/edit/:id', BrandController.updateBrand);

// Delete a brand by ID
router.delete('/delete/:id', BrandController.deleteBrand);

module.exports = router;
