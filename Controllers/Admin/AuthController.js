const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../Models/Admin/AuthModel');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if all fields are provided
        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email is already in use
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newAdmin = new Admin({
            userName,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Token expires in 7 days
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                userName: admin.userName,
                email: admin.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
