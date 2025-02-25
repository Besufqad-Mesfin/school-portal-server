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
  headName: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Ensures valid email format
    },
  },
  availability: {
    type: DataTypes.ENUM('Monday', 'Tuesday', 'Friday'),
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
