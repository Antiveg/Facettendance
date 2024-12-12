const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming you have a User model
const secretKey = "HELLO_WORLD_ILOVEU_MAMAMIA"; // Use environment variable for secret key

const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,  // Can't be accessed by JavaScript
        secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
        maxAge: 60 * 60 * 1000,  // Token expires in 1 hour
        sameSite: 'Strict',  // Prevent CSRF
        path: '/'  // Available for all routes in the app
    });
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // If user is not found, create a custom error and pass it using next
            const error = new Error('User not found');
            error.name = 'USER_NOT_FOUND';
            return next(error); // Pass the error to the error handler
        }

        // Compare the password with the stored hash
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            // If password doesn't match, create a custom error and pass it using next
            const error = new Error('Invalid credentials');
            error.name = 'INVALID_CREDENTIALS';
            return next(error); // Pass the error to the error handler
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            secretKey,
            { expiresIn: '1h' }
        );

        // Set the token in an HTTP-only cookie
        setTokenCookie(res, token);

        // Respond with the token and user information
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        next(error); // If an unexpected error occurs, pass it to the error handler
    }
};

// Register user
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            const error = new Error('User already existed');
            error.name = 'CREDENTIAL_NOT_UNIQUE'; // Custom error name
            return next(error); // Pass to the next middleware (error handler)
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Respond with the token
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        next(error);
    }
};

const logout = (req, res, next) => {
    try {
        res.clearCookie('token');  // Clear the cookie
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        // Pass any error to the next middleware (centralized error handler)
        next(error);
    }
};


module.exports = { login, register, logout };
