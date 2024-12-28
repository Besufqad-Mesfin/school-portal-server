import express from 'express';
import { studentLogin } from '../controllers/login/studentLogin.js'; // Ensure this matches exactly

const studentRoute = express.Router();

studentRoute.post('/login', studentLogin); 


export default studentRoute;