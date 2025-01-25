import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import database configuration

// Define the Refund model
const Refund = sequelize.define('Refund', {
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Payment', // Reference the Payment model
            key: 'id',
        },
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // Default refund status
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: false, // Disable automatic timestamps
});

export default Refund; // Export the model
