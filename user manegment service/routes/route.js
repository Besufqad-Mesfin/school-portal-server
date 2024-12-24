import express from 'express';
import { login } from '../controllers/login.js'; // Adjust the path if necessary

const router = express.Router();

// POST route for login
router.post('/', login);

export default router;
