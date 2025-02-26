import sequelize from "../config/db.js";
import { Sequelize, DataTypes } from 'sequelize';



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
      isEmail: true,
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
  tableName: 'Department',  // ✅ Explicitly set the table name
});

export default Department;
