const express = require('express');
const router = express.Router();
const CarouselController = require('../../Controllers/Admin/CarousalController');

// Add a new carousel item
router.post('/add', CarouselController.addCarouselItem);

// Get all carousel items
router.get('/view', CarouselController.getCarouselItems);

// Get a specific carousel item by ID
router.get('/view/:id', CarouselController.getCarouselItemById);

// Edit a carousel item by ID
router.patch('/edit/:id', CarouselController.updateCarouselItem);

// Delete a carousel item by ID
router.delete('/delete/:id', CarouselController.deleteCarouselItem);

module.exports = router;
