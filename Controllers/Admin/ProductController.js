const Product = require('../../Models/Admin/ProductModel');
const Category = require('../../Models/Admin/CategoryModel');

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, category, is_offerProduct, is_popularProduct, is_mainProduct, actualPrice, offerPrice, discount, stock, images, sizes } = req.body;

        // Validate required fields
        if (!name || !description || !category || !actualPrice || !stock) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if category exists
        const foundCategory = await Category.findById(category);
        if (!foundCategory) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        // Validate sizes (if provided)
        if (sizes && !Array.isArray(sizes)) {
            return res.status(400).json({ message: 'Sizes must be an array' });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            category,
            is_offerProduct,
            is_popularProduct,
            is_mainProduct,
            actualPrice,
            offerPrice,
            discount,
            stock,
            images: images || [], // Optional images
            sizes: sizes || [], // Optional sizes
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

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
            .populate('category'); // Populate category details
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Edit a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, category, is_offerProduct, is_popularProduct, is_mainProduct, actualPrice, offerPrice, discount, stock, images, sizes } = req.body;

        // Check if product exists
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product details
        product.name = name !== undefined ? name : product.name;
        product.description = description !== undefined ? description : product.description;
        product.category = category !== undefined ? category : product.category;
        product.is_offerProduct = is_offerProduct !== undefined ? is_offerProduct : product.is_offerProduct;
        product.is_popularProduct = is_popularProduct !== undefined ? is_popularProduct : product.is_popularProduct;
        product.is_mainProduct = is_mainProduct !== undefined ? is_mainProduct : product.is_mainProduct;
        product.actualPrice = actualPrice !== undefined ? actualPrice : product.actualPrice;
        product.offerPrice = offerPrice !== undefined ? offerPrice : product.offerPrice;
        product.discount = discount !== undefined ? discount : product.discount;
        product.stock = stock !== undefined ? stock : product.stock;
        product.images = images !== undefined ? images : product.images;
        product.sizes = sizes !== undefined ? sizes : product.sizes; // Update sizes

        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
