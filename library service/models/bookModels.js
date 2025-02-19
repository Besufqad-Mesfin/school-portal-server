// models/bookModels.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Book = sequelize.define('Book', {
    bookId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    availableCopies: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
}, {
    timestamps: true,
});

export default Book;