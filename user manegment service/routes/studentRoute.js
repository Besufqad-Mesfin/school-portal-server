import express from 'express';
import { studentLogin } from '../controllers/login/studentLogin.js'; // Ensure this matches exactly
import { updateStudentPassword } from '../controllers/passwordChange/studentPasswordChange.js';
const studentRoute = express.Router();

studentRoute.post('/login', studentLogin); 
studentRoute.post('/update-password',updateStudentPassword);
export default studentRoute;