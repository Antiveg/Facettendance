const UserPhotos = require('../models/UserPhotos')

const getPhotosByUserId = async (req, res, next) => {
    try {
        const { id } = +req.headers['user']
    }catch(error){
        next(error)
    }
}