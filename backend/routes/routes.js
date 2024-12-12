const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticate = require('../middlewares/authenticate')
const errorHandler = require('../middlewares/errorHandling')
const { login, register, logout } = require('../controllers/authController')

router.post('/auth/login', login)
router.post('/auth/register', register)

router.use(authenticate)
router.get('/auth/logout', logout)

router.use(errorHandler)

module.exports = router;

// const storage = multer.diskStorage({ // Setup Multer storage configuration
//     destination: (req, file, cb) => {
//         cb(null, './uploads');  // Store files in the "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
//     },
// });
// const upload = multer({ storage: storage });
