const Carousel = require('../../Models/Admin/CarousalModel');



// Get all carousel items
exports.getCarouselItems = async (req, res) => {
    try {
        const carouselItems = await Carousel.find();
        res.status(200).json({ carouselItems });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific carousel item by ID
exports.getCarouselItemById = async (req, res) => {
    try {
        const carouselItem = await Carousel.findById(req.params.id);
        if (!carouselItem) {
            return res.status(404).json({ message: 'Carousel item not found' });
        }
        res.status(200).json({ carouselItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


