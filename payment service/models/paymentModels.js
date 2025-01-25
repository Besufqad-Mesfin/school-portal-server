import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 

const Payment = sequelize.define('Payment', {
    paymentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,  // Automatically increments for each new payment
        primaryKey: true,     // Marks this field as the primary key
    },
    studentId: {
        type: DataTypes.STRING, 
        allowNull: false,
       
    },
    amount: {
        type: DataTypes.FLOAT, 
        allowNull: false, 
        validate: {
            isPositive(value) {
                if (value <= 0) {
                    throw new Error('Amount must be a positive number');
                }
            }
        }
    },
    currency: {
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            isIn: {
                args: [['USD', 'EUR', 'BIRR','GBP', 'JPY']], 
                msg: "Currency must be one of 'USD', 'EUR', 'GBP', 'JPY'"
            }
        }
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
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});


export default Payment;
