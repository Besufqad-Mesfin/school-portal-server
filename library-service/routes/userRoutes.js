import express from 'express'; // Import Express
import { registerUser } from '../controllers/userControllers.js'; // Import user controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const userRoutes = express.Router(); // Create a new router

// Define user routes
userRoutes.post('/register',authMiddleware, registerUser); // Route to register a new user (student, librarian, or volunteer)

export default userRoutes; // Export the router