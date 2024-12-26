import express from 'express';
import { studentRegister } from '../controllers/StudentRegister.js'; // Import the register controller

const router = express.Router();

// POST route for student registration
router.post('/register', studentRegister);

export default router;
