const Category = require('../../Models/Admin/CategoryModel');

// Add a new category
exports.addCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        // Validate required fields
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        // Check if category with the same name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this name already exists' });
        }

        // Create a new category
        const newCategory = new Category({
            name,
            description,
            image: image || '', // Optional image
        });

        await newCategory.save();

        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Edit a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        // Check if the category exists
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update category
        category.name = name || category.name;
        category.description = description || category.description;
        category.image = image || category.image;

        await category.save();

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
