const Address = require('../../Models/User/AddressModel');
const User = require('../../Models/User/Auth');

// Add Address
exports.addAddress = async (req, res) => {
    const { userId } = req.params;
    const { street, city, state, zipCode, country, isDefault } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If isDefault is true, unset default on other addresses
        if (isDefault) {
            await Address.updateMany({ user: userId }, { isDefault: false });
        }

        const newAddress = new Address({
            street,
            city,
            state,
            zipCode,
            country,
            isDefault
        });

        await newAddress.save();

        // Add the address to the user's address list
        user.addresses.push(newAddress._id);
        await user.save();

        res.status(201).json({ message: 'Address added successfully', address: newAddress });
    } catch (error) {
        res.status(500).json({ message: 'Error adding address', error });
    }
};

// Get All Addresses for a User
exports.getAddresses = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('addresses');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ addresses: user.addresses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses', error });
    }
};

// Delete an Address
exports.deleteAddress = async (req, res) => {
    const { userId, addressId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the address from the user's address list
        user.addresses = user.addresses.filter(address => address.toString() !== addressId);
        await user.save();

        // Delete the address document
        await Address.findByIdAndDelete(addressId);

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address', error });
    }
};


// Update an Address
exports.updateAddress = async (req, res) => {
    const { userId, addressId } = req.params;
    const { street, city, state, zipCode, country, isDefault } = req.body;

    try {
        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the address to update
        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // If isDefault is being updated, we may need to unset other addresses' default status
        if (isDefault) {
            await Address.updateMany({ user: userId }, { isDefault: false });
        }

        // Update the address
        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.zipCode = zipCode || address.zipCode;
        address.country = country || address.country;
        address.isDefault = isDefault || address.isDefault;

        await address.save(); // Save the updated address

        res.status(200).json({ message: 'Address updated successfully', address });
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error });
    }
};
