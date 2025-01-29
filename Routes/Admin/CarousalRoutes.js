const express = require('express');
const router = express.Router();
const CarouselController = require('../../Controllers/Admin/CarousalController');
const jwtVerify = require('../../Middlewares/jwtMiddleware')


// Add a new carousel item
router.post('/add',jwtVerify(['admin']), CarouselController.addCarouselItem);

// Get all carousel items
router.get('/view',jwtVerify(['admin']), CarouselController.getCarouselItems);

// Get a specific carousel item by ID
router.get('/view/:id',jwtVerify(['admin']), CarouselController.getCarouselItemById);

// Edit a carousel item by ID
router.patch('/edit/:id',jwtVerify(['admin']), CarouselController.updateCarouselItem);

// Delete a carousel item by ID
router.delete('/delete/:id',jwtVerify(['admin']), CarouselController.deleteCarouselItem);

module.exports = router;
