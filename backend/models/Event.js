const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Your Sequelize connection

// Define the Event model
const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Auto-increment ID
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,  // Event title cannot be null
    },
    start_time: {
        type: DataTypes.DATE,  // Date and Time for start
        allowNull: false,  // Start time is required
    },
    end_time: {
        type: DataTypes.DATE,  // Date and Time for end
        allowNull: false,  // End time is required
    },
    location: {
        type: DataTypes.STRING,  // Store location as a string (could be address or coordinates)
        allowNull: false,  // Location is required
    },
    description: {
        type: DataTypes.TEXT,  // Allow longer text for description
        allowNull: true,  // Description is optional
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Creator ID is required
        references: { model: 'User', key: 'id' },  // Foreign key to the User table (creator of the event)
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,  // Automatically set the timestamp to current time
        allowNull: false,
    },
}, {
    // Optionally, add timestamps for createdAt and updatedAt
    timestamps: true,
});

// Export the Event model
module.exports = Event;
