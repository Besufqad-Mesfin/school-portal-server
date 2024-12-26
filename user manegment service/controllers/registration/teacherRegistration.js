



// models/UserTeacher.js
import sequelize from '../config/db.js'; // Import the initialized sequelize instance
import { DataTypes } from 'sequelize';

// Define the UserTeacher model
const UserTeacher = sequelize.define('UserTeacher', {
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure teacherId is unique
  },
  password: {
    type: DataTypes.STRING, // Use STRING for storing hashed passwords
    allowNull: false,
  },
});

// Define the TeacherRegistrationModel
const TeacherRegistrationModel = sequelize.define('TeacherRegistration', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
    validate: {
      isEmail: true, // Validate email format
    },
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the models
