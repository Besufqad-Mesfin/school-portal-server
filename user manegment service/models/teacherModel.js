// models/UserTeacher.js
import sequelize from '../config/db.js'; // Import the initialized sequelize instance
import { DataTypes } from 'sequelize';

// Define the UserTeacher model using the imported sequelize instance
const UserTeacher = sequelize.define('UserTeacher', {
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, // Changed from INTEGER to STRING for storing hashed passwords
    allowNull: false,
  },
});

// Export the model
export default UserTeacher;
