const User = require('../models/userModel');


exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.fields);

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.fields);

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }

        res.status(200).json({ message: 'User deleted', 'user': user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
