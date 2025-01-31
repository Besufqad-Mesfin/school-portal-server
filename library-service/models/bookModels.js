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
    studentId: { // Changed userId to studentId
        type: DataTypes.INTEGER, // Assuming studentId is an Integer
        allowNull: false,
       
    },
    bookId: {
        type: DataTypes.INTEGER, // Assuming bookId is an Integer
        allowNull: false,
       
    },
    dateBorrowed: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
    },

    message: { 
        type: String,
         required: true
         },
    dateSent: { type: Date, 
        default: Date.now
     },
    type: { type: String, enum: ['due_date_reminder', 'new_arrival',], 
        required: true
    },
    transactionId: {
        type: DataTypes.INTEGER, // Assuming transactionId is an Integer
        allowNull: false,

    },
    amount: {
        type: DataTypes.FLOAT, // Fine amount
        allowNull: false,
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default to unpaid
    },
    dateIssued: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Default to current date
    }

}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});

// Export the Book model
export default Book;
