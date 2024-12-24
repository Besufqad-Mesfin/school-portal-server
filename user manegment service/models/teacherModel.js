// models/UserTeacher.js
import sequelize from '../config/db.js'; // Import the initialized sequelize instance
import { DataTypes } from 'sequelize';

// Define the UserTeacher model using the imported sequelize instance
const UserTeacher = sequelize.define('UserTeacher', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, // Changed from INTEGER to STRING for storing hashed passwords
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
UserTeacher.sync({alter:true})
  .then(() => {
    console.log('Table and model synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing the table and models:', err);
  });

// Export the model
export default UserTeacher;
