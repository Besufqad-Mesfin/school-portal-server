import express from 'express';  // Importing express
import {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    addTeacherToDepartment,
    getDepartmentTeachers,
    removeTeacherFromDepartment
} from "../controllers/department.js";  // Importing the department controller methods

const departmentRouter  = express.Router();

// Route to create a new department
departmentRouter.post('/department', createDepartment);

// Route to get all departments
departmentRouter.get('/department', getDepartments);

// Route to get a specific department by its ID
departmentRouter.get('/department/:id', getDepartmentById);

// Route to update a department by its ID
departmentRouter.put('/department/:id', updateDepartment);

// Route to delete a department by its ID
departmentRouter.delete('/department/:id', deleteDepartment);

// Route to add a teacher to a department
departmentRouter.post('/department/teacher', addTeacherToDepartment);

// Route to get all teachers in a department
departmentRouter.get('/department/:departmentId/teachers', getDepartmentTeachers);

// Route to remove a teacher from a department
departmentRouter.delete('/department/teacher', removeTeacherFromDepartment);

export default departmentRouter;
