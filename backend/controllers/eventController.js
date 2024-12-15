const Event = require('../models/Event')
const EventParticipants = require('../models/EventParticipants')
const User = require('../models/User')

const getAllEvents = async (req, res, next) => {
    try {

        const events = await Event.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
        
        const formattedEvents = events.map((event) => {
            const start_time = new Date(event.start_time);
            const end_time = new Date(event.end_time);

            const formattedStartTime = start_time.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const formattedEndTime = end_time.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            return {
                ...event.toJSON(),
                start_time: formattedStartTime,
                end_time: formattedEndTime
            };
        });

        res.status(200).json({
            message: "Successfully fetched all events info!",
            events: formattedEvents
        });
    }catch(error){
        next(error)
    }
}

const getEventById = async (req, res, next) => {
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
        const { title, start_time, end_time, location, description, participants, creator } = req.body

        const newEvent = await Event.create({
            title: title,
            start_time: start_time, 
            end_time: end_time, 
            location: location, 
            description: description,
            creatorId: creator
        })
        
        const newParticipants = await Promise.all(participants.map(async (id) => {
            return await EventParticipants.create({
                userId: id,
                eventId: newEvent.id,
                img_proof: null,
                status: false,
            });
        }));

        res.status(201).json({
            message: "event successfully created!",
            event: {
                newEvent,
                participants: participants
            }
        })
    }catch(error){
        next(error)
    }
}

const getEventsByUserId = async (req, res, next) => {
    try {
        const { id } = req.user
        const events = await EventParticipants.findAll({
            attributes: {
                include: ['eventId']
            },
            where: {
                userId: id
            },
            include: [
                {
                    model: Event,
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    }
                },
                {
                    model: EventParticipants,
                    attributes: {
                        include: ['userId']
                    },
                    include: {
                        model: User,
                        attributes: {
                            include: ['name']
                        }
                    }
                }
            ]
        })

        res.status(200).json({
            message: "successfully fetch all event associated with logged user along with its participants",
            data: events
        })
    }catch(error){
        next(error)
    }
}

module.exports = { getAllEvents, getEventById, createEvent, getEventsByUserId }