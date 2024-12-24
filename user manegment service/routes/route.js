import express from 'express';
import { loginT } from '../controllers/loginTeacher.js'; // Adjust the path if necessary

const router = express.Router();

// POST route for login
router.post('/teacher', loginT);

export default router;
