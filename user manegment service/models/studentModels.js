import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Student = sequelize.define('Students', {
    studentId: { // Ensure column name matches exactly
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Student;