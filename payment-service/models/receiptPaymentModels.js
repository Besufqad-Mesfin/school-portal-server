import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Ensure this points to your database connection

// Define the Receipt model
const Receipt = sequelize.define('Receipt', {
    paymentId: {
        type: DataTypes.INTEGER, // Foreign key linking to the Payment
        allowNull: false,
        references: {
            model: 'Payments', // This references the 'Payments' model
            key: 'id', // Refers to the 'id' column in the Payments table
        },
    },
    receiptNumber: {
        type: DataTypes.STRING, // Receipt number for unique identification
        allowNull: false,
        unique: true, // Ensure receipt numbers are unique
    },
    amount: {
        type: DataTypes.FLOAT, // The total amount of the payment
        allowNull: false,
    },
    dateIssued: {
        type: DataTypes.DATE, // Date when the receipt was issued
        defaultValue: Sequelize.NOW, // Default to current date and time
    },
}, {
    timestamps: false, // No automatic timestamps
});

// Export the Receipt model for use in controllers
export default Receipt;
