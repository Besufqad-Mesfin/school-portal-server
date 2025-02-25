import express from 'express';
import { studentLogin } from '../controllers/login/studentLogin.js'; // Ensure this matches exactly
import { updateStudentPassword } from '../controllers/passwordChange/studentPasswordChange.js';
import { studentLogout } from '../controllers/logout/studentLogout.js';
const studentRoute = express.Router();

studentRoute.post('/login', studentLogin); 
studentRoute.post('/update-password',updateStudentPassword);
studentRoute.post('/logout',studentLogout);
export default studentRoute;