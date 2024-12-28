import express from 'express';
import { loginTeacher } from '../controllers/login/teacherLogin.js'; // Adjust the path if necessary
import { authenticateUser } from '../middleware/auth.js';

const teacherRoute = express.Router();

// POST route for login
teacherRoute.post('/login', loginTeacher);
teacherRoute.post('/change-password',authenticateUser,changePassword );



export default teacherRoute;
