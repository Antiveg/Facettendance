// EventParticipants Model (EventParticipants.js)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Your Sequelize connection

// Define the EventParticipants model
const EventParticipants = sequelize.define('EventParticipants', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },  // Foreign key to User model
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Events', key: 'id' },  // Foreign key to Event model
    },
    img_proof: {
        type: DataTypes.STRING,  // Store the image proof (could be a URL or file path)
        allowNull: true,  // img_proof is optional
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,  // Default status is false (not attended)
    },
}, {
    // Optionally, add timestamps for createdAt and updatedAt
    timestamps: true,
});

EventParticipants.associate = (models) => {
    EventParticipants.belongsTo(models.User, { 
        foreignKey: 'userId' 
    });
    EventParticipants.belongsTo(models.Event, { 
        foreignKey: 'eventId' 
    });
};

// Export the EventParticipants model
module.exports = EventParticipants;
