import express from 'express';
import adminLogin from '../controllers/login/adminLogin.js'; // Ensure this matches exactly
import registerTeacher from '../controllers/registration/teacherRegistration.js';
import studentRegister from '../controllers/registration/studentRegisteration.js';
import staffRegister from '../controllers/registration/staffRegistration.js';
import { changePassword } from '../controllers/passwordChange/adminPasswordChange.js';


const adminRoute = express.Router();

adminRoute.post('/login', adminLogin);
adminRoute.post("/studentRegister", studentRegister);
adminRoute.post("/teacherRegister", registerTeacher);
adminRoute.post("/adminRegister", staffRegister);
adminRoute.post('/changePassword', changePassword);

export default adminRoute;