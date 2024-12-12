const Event = require('../models/Event')

const getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })

        res.status(200).json({
            message: "successfully fetch all events info!",
            data: events
        })
    }catch(error){
        next(error)
    }
}

const getEventsById = async (req, res, next) => {
    try {
        const id = +req.params.id
        const event = await Event.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                id: id
            }
        })

        if(!event){
            res.status(404).json({
                message: `event ${id} not found`
            })
        }else{
            res.status(200).json({
                message: `event ${id} found`,
                data: event
            })
        }
    }catch(error){
        next(error)
    }
}

const createEvent = async (req, res, next) => {
    try {
        const { title, start_time, end_time, location, description } = req.body
        const creator_id = +req.body.creator
    }catch(error){
        next(error)
    }
}

module.exports = { getAllEvents, getEventsById }