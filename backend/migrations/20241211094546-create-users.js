'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Auto-increment ID
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,  // Name is required
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,  // Password is required
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,  // Email is required
      },
      face_data: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),  // Store an array of floats for face data
        allowNull: true,  // Face data is optional
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // Automatically set createdAt field
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // Automatically set updatedAt field
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If rolling back the migration, drop the 'users' table
    await queryInterface.dropTable('users');
  }
};
