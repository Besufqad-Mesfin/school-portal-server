// models/BookTransaction.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // For the library service database
import Book from './bookModels.js';
import Student from './studentModels.js';
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
    references: {
      model: Student,
      key: 'studentId',
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
  },
  returned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  tableName: 'book_transactions',
});

BookTransaction.belongsTo(Book, { foreignKey: 'bookId' });
BookTransaction.belongsTo(Student, { foreignKey: 'studentId' });

export default BookTransaction;