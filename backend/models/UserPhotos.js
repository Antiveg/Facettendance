// UserPhotos Model (simplified)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');  // Your Sequelize connection

const UserPhotos = sequelize.define('UserPhotos', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },  // Foreign key to User
        primaryKey: true,
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,  // Composite primary key with `userId`
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

// Relationships
const User = sequelize.models.User;
User.hasMany(UserPhotos, { foreignKey: 'userId' });
UserPhotos.belongsTo(User, { foreignKey: 'userId' });

module.exports = UserPhotos;
