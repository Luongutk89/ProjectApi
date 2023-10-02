const bcrypt = require('bcrypt');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');

exports.hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}


exports.checkEmail = async (email) => {
    try {
        const existingUser = await User.findOne({ email });
        return existingUser !== null;
    } catch (error) {
        throw new Error('Error checking email');
    }
}


exports.getAvatarPath = (file, domain) => {
    if (file) {
        return `${domain}/uploads/${file.filename}`;
    }
    return null;
}


exports.createUser = async (username, email, password, role, avatar) => {
    try {
        const newUser = await User.create({
            username, email, password, role, avatar,
        });
        return newUser;
    } catch (error) {
        throw new Error('Error creating user');
    }
}


exports.getUsersByStatus = async (status) => {
    try {
        const users = await User.find({ isDeleted: status === 'deleted' });
        return users;
    } catch (error) {
        throw new Error(`Error getting ${status === 'deleted' ? 'deleted' : 'active'} users`);
    }
}

exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Error getting user by ID');
    }
}

exports.updateUser = async (userId, updatedData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user');
    }
}


exports.softDeleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
        return user;
    } catch (err) {
        throw new Error('Error updating user');
    }
};


exports.restoreUser = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { isDeleted: false }, { new: true });
        return user;
    } catch (err) {
        throw new Error('Error restoring user');
    }
};


exports.deleteUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        throw new Error('Error deleting user');
    }
}


exports.registerUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw new Error('Error registering user');
    }
}


exports.generateToken = (userId) => {
    const secretKey = 'your_secret_key';
    const expiresInOneMonth = 30 * 24 * 60 * 60;
    const token = jwt.sign({ userId }, secretKey, { expiresIn: expiresInOneMonth });
    return token;
}


exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

exports.comparePassword = async (password, hashedPassword) => {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
}




