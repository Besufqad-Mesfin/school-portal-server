import express from 'express';
import { getPaymentHistory } from '../controllers/historyPaymentControllers.js'; // Import the controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import the auth middleware

const paymentHistoryRouter = express.Router(); // Create a new router

// Set up GET route for retrieving payment history
paymentHistoryRouter.get('/history', authMiddleware, getPaymentHistory);

export default paymentHistoryRouter; // Export the route
