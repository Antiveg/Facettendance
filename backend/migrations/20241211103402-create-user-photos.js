'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the user_photos table
    await queryInterface.createTable('user_photos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Auto-increment ID
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // Reference the 'users' table
          key: 'id',  // The 'id' column in the 'users' table
        },
      },
      photo_url: {
        type: Sequelize.STRING,  // The URL of the photo (can be a file path or URL)
        allowNull: false,  // photo_url cannot be null
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
    // Rollback: Drop the 'user_photos' table
    await queryInterface.dropTable('user_photos');
  }
};
