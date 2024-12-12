// Import required modules
const express = require('express');
const cors = require('cors');
const router = require('./routes/routes')
const errorHandler = require('./middlewares/errorHandling')

const app = express(); // Initialize an Express app

app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(router)
app.use(errorHandler);

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});