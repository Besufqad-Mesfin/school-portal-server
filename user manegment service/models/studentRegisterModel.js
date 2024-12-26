import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Student = sequelize.define('Student', {
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => Math.floor(100000 + Math.random() * 900000).toString(), // Generates a random 6-digit studentId
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guardianContact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Student;
