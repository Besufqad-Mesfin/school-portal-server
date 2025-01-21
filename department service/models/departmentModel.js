import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Ensure this points to your configured Sequelize instance

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  headId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Teachers', // Reference to the Teachers table in the usermanagement service
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
  }
}, {
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
});

export default Department;
