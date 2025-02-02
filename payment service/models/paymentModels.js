import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import BookTransaction from '../../library service/models/bookTransaction'; 

const Payment = sequelize.define('Payment', {
    paymentId: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bookTransactionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        // may be fine ,monthly payment ,etc
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cash', 
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true, 
        unique: true,
    },

    accountNumber: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', 
    },
    refundStatus: {
        type: DataTypes.STRING,
        defaultValue: 'none', 
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
