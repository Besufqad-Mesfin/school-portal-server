// models/UserTeacher.js
import sequelize from '../config/db.js'; // Import the initialized sequelize instance
import { DataTypes } from 'sequelize';

// Define the UserTeacher model using the imported sequelize instance

// Export the model



const teacherModel = sequelize.define('teacherModel', {
  First_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Last_name:{
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
  teacher_Id:{
    type:DataTypes.STRING,
    allowNull:false
  },
  educational_Status:{
    type:DataTypes.STRING
  },
  Gender:{
    type:DataTypes.STRING
  },
  Contact_no:{
    type:DataTypes.STRING
  }
});


export default teacherModel ;
