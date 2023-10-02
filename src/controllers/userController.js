const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    const file = req.file;
    const domain = `${req.protocol}://${req.get('host')}`;

    try {
        const emailExists = await userService.checkEmail(email);
        if (emailExists) {
            return res.status(400).json({
                error: true,
                message: "Email already exists",
            });
        }

        const hashedPassword = await userService.hashPassword(password);
        const avatarPath = userService.getAvatarPath(file, domain);
        const newUser = await userService.createUser(
            username, email, hashedPassword, role, avatarPath
        );

        return res.status(200).json({
            error: false,
            message: "Create User Successfully!",
            data: newUser
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.getUsers = async (req, res) => {
    const status = req.query.status ? req.query.status : 'active';
    try {
        const users = await userService.getUsersByStatus(status);
        return res.status(200).json({
            error: false,
            message: `Get ${status === 'active' ? 'Active' : 'Deleted'} Users Successfully!`,
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.getUserById = async (req, res) => {
    const userId = req.user;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found!",
            });
        }
        return res.status(200).json({
            error: false,
            message: "Get User Successfully!",
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


exports.updateUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    const file = req.file;
    const domain = `${req.protocol}://${req.get('host')}`;

    try {
        const userId = req.params.userId;
        const existingUser = await userService.getUserById(userId);
        if (!existingUser) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }


        if (email && email !== existingUser.email) {
            return res.status(400).json({
                error: true,
                message: "Cannot update email",
            });
        }


        const hashedPassword = await userService.hashPassword(password);
        const avatarPath = userService.getAvatarPath(file, domain);
        const updates = { username, password: hashedPassword, role, avatar: avatarPath };
        const updatedUser = await userService.updateUser(userId, updates);

        return res.status(200).json({
            error: false,
            message: "Update User Successfully!",
            data: updatedUser
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.softDeleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await userService.softDeleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }
        return res.status(200).json({
            error: false,
            message: "User has been temporarily deleted",
            data: deletedUser
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.restoreUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userService.restoreUser(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            error: false,
            message: "User has been restored",
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({
                error: true,
                message: "User not found!",
            });
        }
        return res.status(200).json({
            error: false,
            message: "Delete User Successfully!",
            data: deletedUser
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    const file = req.file;
    const domain = `${req.protocol}://${req.get('host')}`;
    try {
        const emailExists = await userService.checkEmail(email);
        if (emailExists) {
            return res.status(400).json({
                error: true,
                message: "Email already exists",
            });
        }

        if (role) {
            return res.status(403).json({
                error: true,
                message: "You don't have permission to set the role",
            });
        }

        const hashedPassword = await userService.hashPassword(password);
        const avatarPath = userService.getAvatarPath(file, domain);
        const userData = {
            username, email, password: hashedPassword, avatar: avatarPath
        }

        const newUser = await userService.registerUser(userData);


        return res.status(200).json({
            error: false,
            message: 'User registered successfully',
            data: newUser,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        const isPasswordValid = await userService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: true,
                message: 'Invalid credentials',
            });
        }

        const token = await userService.generateToken(user._id);

        return res.status(200).json({
            error: false,
            message: 'Login successful',
            token: token,
            data: user
        });
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: err.message,
        });
    }
};