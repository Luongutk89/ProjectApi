const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    role: Joi.string().required(),
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

// Sử dụng middleware validateUser trong route tạo mới người dùng
// app.post("/users", validateUser, createUser);
