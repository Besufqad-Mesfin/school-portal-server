import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Import your Sequelize instance

const Transaction = sequelize.define('Transaction', {
    studentId: { // Changed userId to studentId
        type: DataTypes.INTEGER, // Assuming studentId is an Integer
        allowNull: false,
        references: {
            model: 'Users', // Name of the User model
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER, // Assuming bookId is an Integer
        allowNull: false,
        references: {
            model: 'Books', // Name of the Book model
            key: 'id'
        }
    },
    dateBorrowed: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: true,
});

export default Transaction;
