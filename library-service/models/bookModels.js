import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const bookModels = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Additional fields if necessary
});

export default bookModels;