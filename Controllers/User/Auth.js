const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User/Auth');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if all fields are provided
        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
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

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ 
                    id: user._id, 
                    email: user.email, 
                    role: 'user' 
                }, process.env.JWT_SECRET, {
                    expiresIn: '7d', 
                });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
