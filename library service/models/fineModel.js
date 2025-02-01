import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Transaction from './transactionModel.js';

const Fine = sequelize.define('Fine', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Transaction,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

export default Fine;
