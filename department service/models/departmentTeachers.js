import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Ensure this points to your configured Sequelize instance

const DepartmentTeachers = sequelize.define('DepartmentTeachers', {
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Departments', // Reference to the Departments table in the department service
      key: 'id',
    }
  },
  teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Teachers', // Reference to the Teachers table in the usermanagement service
      key: 'id',
    }
  }
});

export default DepartmentTeachers;
