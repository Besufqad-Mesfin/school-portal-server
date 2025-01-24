import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import the Sequelize instance

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING, // Username of the user
        allowNull: false, // Username cannot be null
        unique: true, // Username must be unique
    },
    idNumber: {
        type: DataTypes.STRING, // ID number of the user
        allowNull: false, // ID number cannot be null
        unique: true, // ID number must be unique
    },
    role: {
        type: DataTypes.ENUM('member', 'librarian'), // Role of the user
        defaultValue: 'member', // Default role is 'member'
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});

// Export the User model
export default User;