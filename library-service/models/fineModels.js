import sequelize from "../config/db.js"; // Import your Sequelize instance
import { DataTypes } from "sequelize"; // Import DataTypes

const Fine = sequelize.define('Fine', {
    transactionId: {
        type: DataTypes.INTEGER, // Assuming transactionId is an Integer
        allowNull: false,
        // references: {
        //     model: 'Transactions', // Name of the Transaction model
        //     key: 'id'
        // }
    },
    amount: {
        type: DataTypes.FLOAT, // Fine amount
        allowNull: false,
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default to unpaid
    },
    dateIssued: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Default to current date
    }
});

export default Fine; // Export the Fine model