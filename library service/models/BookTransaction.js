import { Sequelize, DataTypes } from 'sequelize'; 
import sequelize from '../config/db.js';
import Book from './bookModels.js'; 
import Student from '../../user manegment service/models/studentModels.js';

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
            key: 'bookid',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        allowNull: false,
    },
    studentId: {
        type: DataTypes.STRING,
        references: {
            model: Student,
            key: 'studentid',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isAfterDueDate(value) {
                if (value && this.dueDate && new Date(value) <= new Date(this.dueDate)) {
                    throw new Error('Return date must be after the due date.');
                }
            }
        }
    },
    returned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    timestamps: true,
    tableName: 'book_transactions'
});

// Model Associations
BookTransaction.belongsTo(Book, { foreignKey: 'bookId' });
BookTransaction.belongsTo(Student, { foreignKey: 'studentId' });

export default BookTransaction;
