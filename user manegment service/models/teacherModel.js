// models/UserTeacher.js
import sequelize from '../config/db.js'; // Import the initialized sequelize instance
import { DataTypes } from 'sequelize';

// Define the UserTeacher model using the imported sequelize instance
const UserTeacher = sequelize.define('Teachers', {
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,    
  },
  password: {
    type: DataTypes.STRING, // Changed from INTEGER to STRING for storing hashed passwords
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Export the model
export default UserTeacher;
