const { Sequelize } = require('sequelize');

// Set up the Sequelize connection
const config = require('./config/config.json');
const sequelize = new Sequelize(config.development);

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;