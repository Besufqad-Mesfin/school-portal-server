import express from 'express';
import { verifyPayment } from '../controllers/verificationPaymentControllers.js'; // Import the controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const paymentVerificationRouter = express.Router(); // Create a new router

// Set up POST route for verifying payments
paymentVerificationRouter.post('/verify/:paymentId', authMiddleware, verifyPayment);

export default paymentVerificationRouter; // Export the route
