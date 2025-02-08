import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Ensure this points to your configured Sequelize instance

const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Departments', // Reference to the Departments table
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
});

export default Teacher;
