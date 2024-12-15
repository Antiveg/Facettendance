const User = require('../models/User')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const createUser = async (req, res, next) => {
    try {
        const { name, email, password, photos } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        const uploadFolder = path.join(__dirname, 'uploads/users')
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadFolder); 
            },
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        });
        const upload = multer({ storage }).array('photos')

        upload(req, res, async (err) => {
            if (err) {
                return next(err);
            }

            const uploadedFiles = req.files.map(file => ({
                originalName: file.originalname,
                savedAs: file.filename,
                path: file.path,
            }));

            res.status(201).json({
                message: "User created and files uploaded successfully",
                user: newUser,
                files: uploadedFiles,
            });
        });
    }catch(error){
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = +req.headers['user']
        const data = User.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                id: id
            }
        })
        res.status(200).json({
            message: "successfully fetch user info",
            users: data
        })
    }catch(error){
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'face_data','password','email']
            }
        })
        res.status(200).json({
            message: "successfully fetch all users id & name",
            users: users
        })
    }catch(error){
        next(error)
    }
}

module.exports = { createUser, getUserById, getAllUsers }