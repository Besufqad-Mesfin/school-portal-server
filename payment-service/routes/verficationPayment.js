import express from 'express';
import { verifyPayment } from '../controllers/paymentVerification.js'; // Ensure this matches exactly
import authMiddleware from '../middlewares/authMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/verify', authMiddleware, verifyPayment); 

export default paymentRouter;