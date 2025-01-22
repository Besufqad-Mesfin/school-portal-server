import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Database connection

// Define the Payment model
const Payment = sequelize.define('Payment', {
    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'studentModels', // Reference the student model
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: false,
});

export default Payment; // Export the model
