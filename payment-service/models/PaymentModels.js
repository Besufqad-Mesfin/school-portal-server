import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 
const Payment = sequelize.define('Payment', {
    studentId: {
        type: DataTypes.STRING, 
        allowNull: false,
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

export default Payment; 
