const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decodedToken.userId);

        // Attach the user object to the request
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;
