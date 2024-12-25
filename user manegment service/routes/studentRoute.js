import express from 'express';
import { studentLogin } from '../controllers/studentLoging.js'; // Ensure this matches exactly

const router = express.Router();

router.post('/login', studentLogin); 

export default router;