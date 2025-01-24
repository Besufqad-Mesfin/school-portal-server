import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import the Sequelize instance
//User.js
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
        type: DataTypes.ENUM('student', 'librarian', 'volunteer'), // Role of the user
        allowNull: false, // Role cannot be null
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});

// Export the User model
export default User;
