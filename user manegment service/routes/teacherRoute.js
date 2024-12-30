import express from 'express';
import { loginTeacher } from '../controllers/login/teacherLogin.js'; // Adjust the path if necessary
import { changePassword } from '../controllers/passwordChange/teacherPasswordChange.js';

const teacherRoute = express.Router();

// POST route for login
teacherRoute.post('/login', loginTeacher);
teacherRoute.post('/change-password',changePassword );



export default teacherRoute;
