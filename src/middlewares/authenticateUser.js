// Import các module cần thiết
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: true, code: 'MISSING_TOKEN', message: 'Authentication token not found. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: true, code: 'INVALID_TOKEN', message: 'Invalid authentication token. Please log in again.' });
    }
};

module.exports = authenticateUser;
