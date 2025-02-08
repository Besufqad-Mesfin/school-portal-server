// models/BookTransaction.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Book from './bookModels.js'; // Ensure this import is correct

const BookTransaction = sequelize.define('BookTransaction', {
    bookTransactionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'bookId',
        },
        allowNull: false,
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    returned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
    tableName: 'book_transactions',
});

// Define the association
BookTransaction.belongsTo(Book, { foreignKey: 'bookId' });

export default BookTransaction;