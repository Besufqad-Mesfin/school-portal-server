import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Student = sequelize.define('Student', {
    userName: { // Ensure column name matches exactly
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Student;