import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Ensure this points to your configured Sequelize instance

const Department = sequelize.define('Department', {
  departmentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  headName: {  // ✅ Removed foreign key reference
    type: DataTypes.STRING,
    allowNull: false,
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
  }
}, {
  timestamps: true,
});

export default Department;
