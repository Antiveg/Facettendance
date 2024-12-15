const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserPhotos = require('../models/UserPhotos')
const secretKey = "HELLO_WORLD_ILOVEU_MAMAMIA";
const upload = require('../multer')

const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 1000, 
        sameSite: 'Strict', 
        path: '/' 
    });
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email: email } 
        });
        if (!user) {
            const error = new Error('User not found');
            error.name = 'USER_NOT_FOUND';
            return next(error);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        next
            const error = new Error('Invalid credentials');
            error.name = 'INVALID_CREDENTIALS';
            return next(error);
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            secretKey,
            { expiresIn: '1h' }
        );

        setTokenCookie(res, token);

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
        next(error);
    }
};

const register = async (req, res, next) => {

    upload(req, res, async (err) => {
        if (err) {
            return next(err);
        }

        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            });

            const uploadedFiles = req.files.map(file => ({
                originalName: file.originalname,
                savedAs: file.filename,
                path: file.path,
            }));

            req.files.map(file => {
                UserPhotos.create({
                    userId: newUser.id,
                    photo_url: file.path,
                })
            })

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                },
                files: uploadedFiles
            });
        } catch (error) {
            next(error);
        }
    });
};

const logout = (req, res, next) => {
    try {
        res.clearCookie('token'); 
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};


module.exports = { login, register, logout };
