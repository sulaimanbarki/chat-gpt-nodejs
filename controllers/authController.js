const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../resources/validations/userValidation');


exports.register = async (req, res) => {
    try {
        const { error } = registerValidation(req.fields);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { name, email, password, confirmPassword } = req.fields;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, confirmPassword: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.login = async (req, res) => {
    try {
        const { error } = loginValidation(req.fields);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { email, password } = req.fields;


        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '365d',
        });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}