import express from 'express';
import { loginTeacher } from '../controllers/login/teacherLogin.js'; // Adjust the path if necessary

const teacherRoute = express.Router();

// POST route for login
teacherRoute.post('/login', loginTeacher);


export default teacherRoute;
