import { Sequelize, DataTypes } from 'sequelize'; 
import sequelize from '../config/database.js';
import Book from './bookModels.js'; 
import Student from '../../user manegment service/models/studentModels.js';

const BookTransaction = sequelize.define('BookTransaction', {
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        },
        primaryKey: true, 
    },
    studentId: {
        type: DataTypes.STRING,
        references: {
            model: Student,
            key: 'id'
        },
        primaryKey: true, 
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
    }
}, {
    timestamps: true,
    tableName: 'book_transactions'
});


export default BookTransaction;