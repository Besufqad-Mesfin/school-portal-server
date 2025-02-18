import { Sequelize } from 'sequelize';
import Department from './departmentModel.js';
import sequelize from "../config/db.js";
const DepartmentTeacher = sequelize.define('DepartmentTeachers', {
  id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
  },
  departmentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
          model: 'Department',  // Make sure the referenced table is correctly named 'Departments'
          key: 'id'
      }
  },
  teacherId: {
    type: Sequelize.STRING,  // Change this to STRING to store teacherId as a string
    allowNull: false,
  },
  createdAt: {
      type: Sequelize.DATE,
      allowNull: false
  },
  updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
  }
}, {
  tableName: 'DepartmentTeachers',  // Ensure the table name matches what you intend
  timestamps: true  // Automatically manage createdAt and updatedAt fields
});


export default DepartmentTeacher;