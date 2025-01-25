import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import the database connection

// Define the Reminder model
const Reminder = sequelize.define('Reminder', {
    paymentId: {
        type: DataTypes.INTEGER, // Link to the payment being reminded about
        allowNull: false,
        references: {
            model: 'Payments', // This references the 'Payments' model (where payment details are stored)
            key: 'id',
        },
    },
    studentId: {
        type: DataTypes.INTEGER, // Student ID for the person who is receiving the reminder
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING, // Reminder message content
        allowNull: false,
    },
    sentAt: {
        type: DataTypes.DATE, // The date when the reminder was sent
        defaultValue: Sequelize.NOW, // Set the default to the current time
    },
}, {
    timestamps: false, // No need for automatic createdAt/updatedAt fields
});

// Export the Reminder model
export { Reminder };
