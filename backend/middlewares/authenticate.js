const jwt = require('jsonwebtoken')
// import jwt from 'jsonwebtoken'
const secretKey = "HELLO_WORLD_ILOVEU_MAMAMIA"; 

/**
 * Middleware to authenticate users using JWT from cookies
 * This middleware will verify if the token is valid
 * and will attach the decoded user info to `req.user`
 */
const authenticate = (req, res, next) => {
    // Get token from cookies (assuming you are using a library like `cookie-parser`)
    const token = req.cookies.token;

    if (!token) {
        // Throw an error to be handled by the centralized error handler
        const error = new Error('No token provided, authorization denied.');
        error.name = 'INVALID_TOKEN'; // Custom error name
        return next(error); // Pass to the next middleware (error handler)
    }

    // Verify the token using JWT
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // Throw an error to be handled by the centralized error handler
            const error = new Error('Invalid token, authorization denied.');
            error.name = 'INVALID_TOKEN'; // Custom error name
            return next(error); // Pass to the next middleware (error handler)
        }

        // Save the decoded user data into `req.user` for use in the route
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = authenticate;
