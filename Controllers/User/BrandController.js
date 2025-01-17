const Brand = require('../../Models/Admin/BrandModel');


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