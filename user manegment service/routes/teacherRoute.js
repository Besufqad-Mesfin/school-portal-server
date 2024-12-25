import express from 'express';
import { loginTeacher } from '../controllers/login/teacherLogin.js'; // Adjust the path if necessary

const router = express.Router();

// POST route for login
router.post('/login', loginTeacher);

export default router;
