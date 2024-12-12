const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Sequelize instance

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // This is the primary key
        autoIncrement: true,  // Automatically increments the id value
    },
    name: {
        type: DataTypes.STRING,  // Store the name as a string
        allowNull: false,  // Name cannot be null
    },
    password: {
        type: DataTypes.STRING,  // Store the password as a string (hashed password ideally)
        allowNull: false,  // Password cannot be null
    },
    email: {
        type: DataTypes.STRING,  // Store the password as a string (hashed password ideally)
        allowNull: false,  // Password cannot be null
    },
    face_data: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: true, 
    },
}, {
    timestamps: true,  // Creates 'createdAt' and 'updatedAt' fields automatically
});

module.exports = User;
