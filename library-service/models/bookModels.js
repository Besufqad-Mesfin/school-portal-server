import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import the Sequelize instance

// Define the Book model
const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING, // Title of the book
        allowNull: false, // Title cannot be null
    },
    author: {
        type: DataTypes.STRING, // Author of the book
        allowNull: false, // Author cannot be null
    },
    isbn: {
        type: DataTypes.STRING, // ISBN number
        allowNull: false, // ISBN cannot be null
        unique: true, // ISBN must be unique
    },
    availableCopies: {
        type: DataTypes.INTEGER, // Number of available copies
        defaultValue: 1, // Default available copies
    },
    totalCopies: {
        type: DataTypes.INTEGER, // Total copies of the book
        allowNull: false, // Total copies cannot be null
    },
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

// Export the Book model
export default Book;
