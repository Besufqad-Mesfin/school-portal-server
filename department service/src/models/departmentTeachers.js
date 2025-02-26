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
          model: Department,  // ✅ Use the actual model reference
          key: 'departmentId' // ✅ Ensure it matches the primary key name in Department
      }
  },
  teacherId: {
    type: Sequelize.STRING,  
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
  tableName: 'DepartmentTeachers',
  timestamps: true  
});

export default DepartmentTeacher;
