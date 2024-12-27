import express from 'express';
import adminLogin from '../controllers/login/adminLogin.js'; // Ensure this matches exactly

const adminRoute = express.Router();

adminRoute.post('/login', adminLogin);
adminRoute.post("/studentRegister", studentRegister);
// adminRoute.post("/teacherRegister", adminLogin);
// adminRoute.post("/adminRegister", adminLogin);

export default adminRoute;