import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Ensure this points to your database configuration

const Payment = sequelize.define('Payment', {
    studentId: {
        type: DataTypes.STRING, // Adjust type according to your User ID type
        allowNull: false,
        references: {
            model: 'studentModels', // Ensure this matches the User model name
            key: 'id', // Identifies the specific column in the referenced model
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
        allowNull: false, // e.g., Tuition, Extracurricular
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: false, // Set to true if you want createdAt and updatedAt fields
});

export default Payment;