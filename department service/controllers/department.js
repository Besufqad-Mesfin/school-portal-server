import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 

const Course = sequelize.define('Course', {
  courseId: {
    type: DataTypes.STRING, 
    unique: true, // Ensure courseId is unique
    allowNull: false, // courseId is required
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Course name is required
    unique: true,     // Course name should be unique
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: false, // Description is required
  },
  gradeLevel: {
    type: DataTypes.STRING,
    allowNull: false, // Grade level is required
    validate: {
      isIn: [['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6']], // Only these grades are allowed
    },
  },
  teacherId: {
    type: DataTypes.INTEGER, // Assuming teacherId is an integer representing the teacher
    allowNull: false, // Course must have a teacher
    references: {
      model: 'Users', // Assuming you have a 'Users' table for teachers
      key: 'id', // The referenced column
    },
  },
   
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Automatically set the creation date
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Automatically set the last updated date
  },
});



export default Course;
