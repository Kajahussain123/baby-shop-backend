const Brand = require('../../Models/Admin/BrandModel');

// Add a new brand
exports.addBrand = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        // Validate required fields
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        // Check if brand already exists
        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return res.status(400).json({ message: 'Brand with this name already exists' });
        }

        // Create a new brand
        const newBrand = new Brand({
            name,
            description,
            image: image || '', // Optional image
        });

        await newBrand.save();

        res.status(201).json({ message: 'Brand added successfully', brand: newBrand });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all brands
exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json({ brands });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single brand by ID
exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json({ brand });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Edit a brand by ID
exports.updateBrand = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        // Check if brand exists
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        // Update brand
        brand.name = name || brand.name;
        brand.description = description || brand.description;
        brand.image = image || brand.image;

        await brand.save();

        res.status(200).json({ message: 'Brand updated successfully', brand });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
