import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 
const Student = sequelize.define('Students', {
  studentId: {
    type: DataTypes.STRING, 
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  place: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Library",
  }
});
export default Student;
