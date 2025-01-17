const Product = require('../../Models/Admin/ProductModel');
const Category = require('../../Models/Admin/CategoryModel');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category'); // Populate category details
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Validate category existence
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Fetch products belonging to the category
        const products = await Product.find({ category: categoryId })
            .populate('category'); // Populate category details

        if (!products.length) {
            return res.status(404).json({ message: 'No products found in this category' });
        }

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
