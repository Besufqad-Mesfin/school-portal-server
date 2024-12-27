import express from 'express';
import adminLogin from '../controllers/login/adminLogin.js'; // Ensure this matches exactly
import registerTeacher from '../controllers/registration/teacherRegistration.js';
import studentRegister from '../controllers/StudentRegister.js';


const adminRoute = express.Router();

adminRoute.post('/login', adminLogin);
adminRoute.post("/studentRegister", studentRegister);
adminRoute.post("/teacherRegister", registerTeacher);
// adminRoute.post("/adminRegister", adminLogin);

export default adminRoute;