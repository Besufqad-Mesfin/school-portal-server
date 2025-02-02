import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Adjust to your DB configuration

// Define the Payment model
const Payment = sequelize.define('Payment', {
    paymentId: { // Changed to explicitly use paymentId
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'BIRR',
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // 'pending', 'completed', 'refunded'
    },
    // Refund-related attributes
    refundStatus: {
        type: DataTypes.STRING,
        defaultValue: 'none', // 'none', 'pending', 'approved', 'rejected'
    },
    refundAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    refundDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    // Receipt-related attributes
    receiptNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    receiptDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'payments',
});

export default Payment;
