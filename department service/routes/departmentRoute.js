import express from 'express';  // Importing express
import {
    createDepartment,
    getdepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
  } from "../controllers/department.js";  // Importing the course controller methods
  
  const departmentRouter  = express.Router();
  
  // Route to create a new course
  departmentRouter .post('/department', createDepartment);
  
  // Route to get all department
  departmentRouter .get('/department', getdepartment);
  
  // Route to get a specific course by its ID
  departmentRouter .get('/department/:dept_id', getDepartmentById);
  
  // Route to update a course by its ID
  departmentRouter .put('/department/:dept_id', updateDepartment);
  
  // Route to delete a course by its ID
  departmentRouter .delete('/department/:dept_id', deleteDepartment);
  
  export default departmentRouter ;
  