const express = require('express');
const cors = require('cors')
// const cookieParser = require('cookie-parser');
const router = require('./routes/routes')
const errorHandler = require('./middlewares/errorHandling')

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
}));
// app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router)
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});