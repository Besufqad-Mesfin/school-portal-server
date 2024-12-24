import express from 'express';
import { loginTeacher } from '../controllers/loginTeacher.js'; // Adjust the path if necessary

const router = express.Router();

// POST route for login
router.post('/teacher', loginTeacher);

export default router;
