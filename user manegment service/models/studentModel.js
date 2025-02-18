import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 
const StudentModel = sequelize.define(
  "Students",
  {
    studentId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
    familyFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    familyLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    familyContact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kebele: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
export default StudentModel;
