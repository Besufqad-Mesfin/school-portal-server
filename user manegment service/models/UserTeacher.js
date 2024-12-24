// models/UserTeacher.js
import sequelize from '../config/db.js';  // Import the initialized sequelize instance
import { DataTypes } from 'sequelize';

// Define the UserTeacher model using the imported sequelize instance
const UserTeacher = sequelize.define('UserTeacher', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the model
export default UserTeacher;
