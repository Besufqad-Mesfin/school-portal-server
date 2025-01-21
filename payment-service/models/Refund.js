import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Refund = sequelize.define('Refund', {
    paymentId: {
        type: DataTypes.INTEGER, // Adjust according to your Payment model ID type
        allowNull: false,
        references: {
            model: 'refund', // Ensure this matches the name of your Payment model
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER, // Adjust according to your User model ID type
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // e.g., 'pending', 'processed'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: false, // Set to true if you want 'createdAt' and 'updatedAt' fields
});

export default Refund;