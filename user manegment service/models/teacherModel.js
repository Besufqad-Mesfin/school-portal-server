// models/UserTeacher.js
import sequelize from '../config/db.js'; // Import the initialized sequelize instance
import { DataTypes } from 'sequelize';

// Define the UserTeacher model using the imported sequelize instance

// Export the model



const teacherModel = sequelize.define('teacherModel', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName:{
    type: DataTypes.STRING,
  },
  password:{
    type:DataTypes.STRING,
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
  teacherId:{

    type:DataTypes.STRING,
    allowNull:false
  },
  educationalStatus:{
    type:DataTypes.STRING
  },
  gender:{
    type:DataTypes.STRING
  },
  contactNo:{
    type:DataTypes.STRING
  }
});


export default teacherModel ;
