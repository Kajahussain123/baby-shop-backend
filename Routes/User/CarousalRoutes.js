const express = require('express');
const router = express.Router();
const CarouselController = require('../../Controllers/User/CarousalController');


// Get all carousel items
router.get('/view', CarouselController.getCarouselItems);

// Get a specific carousel item by ID
router.get('/:id', CarouselController.getCarouselItemById);


module.exports = router;
