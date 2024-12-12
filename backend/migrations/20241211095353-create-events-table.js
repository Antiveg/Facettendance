'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,  // This is the primary key
        autoIncrement: true,  // Automatically increments the id value
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,  // Title cannot be null
      },
      description: {
        type: Sequelize.TEXT,  // Store the description as a long text (paragraphs)
        allowNull: false,  // Description cannot be null
      },
      start_time: {
        type: Sequelize.DATE,  // Store start time (date + time)
        allowNull: false,  // Start time cannot be null
      },
      end_time: {
        type: Sequelize.DATE,  // Store end time (date + time)
        allowNull: false,  // End time cannot be null
      },
      location: {
        type: Sequelize.STRING,  // Store the location info (can be a string, address, or coordinates)
        allowNull: false,  // Location cannot be null
      },
      creatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',  // References the 'users' table
          key: 'id',  // Referencing the 'id' column of the 'users' table
        },
        allowNull: false,  // Creator ID cannot be null
        onDelete: 'CASCADE',  // If the creator is deleted, the event will be deleted as well
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
    // Rollback: Drop the 'events' table
    await queryInterface.dropTable('events');
  }
};
