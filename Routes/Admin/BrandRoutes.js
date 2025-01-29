const express = require('express');
const router = express.Router();
const BrandController = require('../../Controllers/Admin/BrandController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Add a new brand
router.post('/add', jwtVerify(['admin']), BrandController.addBrand);

// Get all brands
router.get('/view',jwtVerify(['admin']), BrandController.getBrands);

// Get a specific brand by ID
router.get('/:id',jwtVerify(['admin']), BrandController.getBrandById);

// Edit a brand by ID
router.patch('/edit/:id',jwtVerify(['admin']), BrandController.updateBrand);

// Delete a brand by ID
router.delete('/delete/:id',jwtVerify(['admin']), BrandController.deleteBrand);

module.exports = router;
