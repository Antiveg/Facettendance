const express = require('express');
const router = express.Router();
// const authenticate = require('../middlewares/authenticate')
const errorHandler = require('../middlewares/errorHandling')
const { login, register, logout } = require('../controllers/authController')
const { getAllEvents, getEventById, createEvent, getEventsByUserId } = require('../controllers/eventController')
const { createUser, getUserById, getAllUsers } = require('../controllers/userController')

router.post('/auth/login', login)
router.post('/auth/register', register)

// router.use(authenticate)
router.get('/auth/logout', logout)
router.get('/events', getAllEvents)
router.get('/event/:id', getEventById)
router.get('/events/user', getEventsByUserId)
router.post('/event/create', createEvent)
router.post('/user/create', createUser)
router.get('/user/:id', getUserById)
router.get('/users', getAllUsers)

router.use(errorHandler)

module.exports = router;