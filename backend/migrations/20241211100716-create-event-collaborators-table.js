'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the table 'event_collaborators'
    await queryInterface.createTable('event_collaborators', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Auto-increment ID
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',  // Reference the 'users' table
          key: 'id',  // The 'id' column of the 'users' table
        },
        allowNull: false,  // userId cannot be null
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'events',  // Reference the 'events' table
          key: 'id',  // The 'id' column of the 'events' table
        },
        allowNull: false,  // eventId cannot be null
      },
      status: {
        type: Sequelize.BOOLEAN,  // A boolean value indicating attendance status
        defaultValue: false,  // Default status is 'false' (not attended)
        allowNull: false,  // Status cannot be null
      },
      img_link: {
        type: Sequelize.STRING,  // Store the image URL as a string
        allowNull: true,  // Image proof of attendance is optional
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // Automatically set the createdAt timestamp
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // Automatically set the updatedAt timestamp
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: Drop the 'event_collaborators' table
    await queryInterface.dropTable('event_collaborators');
  }
};
