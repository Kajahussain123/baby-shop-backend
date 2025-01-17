const Carousel = require('../../Models/Admin/CarousalModel');

// Add a new carousel item
exports.addCarouselItem = async (req, res) => {
    try {
        const { image, title, link, is_active } = req.body;

        // Validate required fields
        if (!image || !title) {
            return res.status(400).json({ message: 'Image and title are required' });
        }

        // Create new carousel item
        const newCarouselItem = new Carousel({
            image,
            title,
            link,
            is_active,
        });

        await newCarouselItem.save();

        res.status(201).json({ message: 'Carousel item added successfully', carouselItem: newCarouselItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

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

// Edit a carousel item by ID
exports.updateCarouselItem = async (req, res) => {
    try {
        const { image, title, link, is_active } = req.body;

        // Check if carousel item exists
        const carouselItem = await Carousel.findById(req.params.id);
        if (!carouselItem) {
            return res.status(404).json({ message: 'Carousel item not found' });
        }

        // Update carousel item details
        carouselItem.image = image || carouselItem.image;
        carouselItem.title = title || carouselItem.title;
        carouselItem.link = link || carouselItem.link;
        carouselItem.is_active = is_active !== undefined ? is_active : carouselItem.is_active;

        await carouselItem.save();

        res.status(200).json({ message: 'Carousel item updated successfully', carouselItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a carousel item by ID
exports.deleteCarouselItem = async (req, res) => {
    try {
        const carouselItem = await Carousel.findByIdAndDelete(req.params.id);
        if (!carouselItem) {
            return res.status(404).json({ message: 'Carousel item not found' });
        }
        res.status(200).json({ message: 'Carousel item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
