import express from 'express';
import { requestRefund } from '../controllers/refundPaymentControllers.js'; // Import controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const refundRouter = express.Router();

// POST route to request a refund
refundRouter.post('/request', authMiddleware, requestRefund);

export default refundRouter; // Export the router
