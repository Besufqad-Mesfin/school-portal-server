import express from 'express';
import adminLogin from '../controllers/login/adminLogin.js'; // Ensure this matches exactly
import registerTeacher from '../controllers/registration/teacherRegistration.js';

const adminRoute = express.Router();

adminRoute.post('/login', adminLogin);
// adminRoute.post("/studentRegister", adminLogin);
 adminRoute.post("/teacherRegister", registerTeacher);
// adminRoute.post("/adminRegister", adminLogin);

export default adminRoute;