import express from 'express';
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  assignTeacherToDepartment,
  getTeachersByDepartmentId,
  removeTeacherFromDepartment
} from '../controllers/department.js';

const router = express.Router();

// Department Routes
router.post('/department', createDepartment);
router.get('/department', getDepartments);
router.get('/department/:departmentId', getDepartmentById);
router.put('/department/:departmentId', updateDepartment);
router.delete('/department/:departmentId', deleteDepartment);

// Department-Teacher Relationship Routes
router.post('/department/assign-teacher', assignTeacherToDepartment);
router.get('/department/:departmentId/teachers', getTeachersByDepartmentId);
router.delete('/department/:departmentId/teacher/:teacherId', removeTeacherFromDepartment);

export default router;
