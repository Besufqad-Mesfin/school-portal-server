import express from 'express'; // Import Express
import * as fineController from '../controllers/fineController.js'; // Import fine controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const fineRoutes = express.Router(); // Create a new router

// Fine routes
fineRoutes.post('/calculate', authMiddleware, fineController.calculateFines);
fineRoutes.get('/', authMiddleware, fineController.viewFines);
fineRoutes.post('/pay', authMiddleware, fineController.payFines);

export default fineRoutes; // Export the router