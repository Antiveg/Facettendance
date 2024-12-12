const User = require('../models/User');
const bcrypt = require('bcryptjs')

const createUser = async (req, res, next) => {
    try {
        const { name, email, password, photos } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
    }catch(error){
        next(error)
    }
}

module.exports = { createUser }