import express from 'express';
import adminLogin from '../controllers/login/adminLogin.js'; // Ensure this matches exactly

const adminRoute = express.Router();

adminRoute.post('/login', adminLogin);

export default adminRoute;