import express from 'express';
import {
  createDepartment,
  getdepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.js";  // Importing the course controller methods

const router = express.Router();

// Route to create a new course
router.post('/department', createDepartment);

// Route to get all department
router.get('/department', getdepartment);

// Route to get a specific course by its ID
router.get('/department/:dept_id', getDepartmentById);

// Route to update a course by its ID
router.put('/department/:dept_id', updateDepartment);

// Route to delete a course by its ID
router.delete('/department/:dept_id', deleteDepartment);

export default router;
