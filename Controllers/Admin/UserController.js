const User = require('../../Models/User/Auth');
const Address = require('../../Models/User/AddressModel'); // If needed

// Get All Users with Addresses for Admin
exports.getAllUsers = async (req, res) => {
    try {
        // Populate the addresses for each user
        const users = await User.find()
            .populate('addresses'); // Populating addresses field

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove associated addresses (optional, if you want to delete addresses as well)
        await Address.deleteMany({ userId: userId });

        // Delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};