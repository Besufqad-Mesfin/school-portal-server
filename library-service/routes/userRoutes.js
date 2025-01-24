import express from 'express'; // Import Express
import { registerStudent, getStudentHistory } from '../controllers/userControllers.js'; // Import user controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const userRoutes = express.Router(); // Create a new router

// Define user routes
userRoutes.post('/register', registerStudent); // Route to register a new student
userRoutes.get('/history', authMiddleware, getStudentHistory); // Route to get student transaction history

export default userRoutes; // Export the router