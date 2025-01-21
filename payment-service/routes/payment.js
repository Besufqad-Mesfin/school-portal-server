import express from 'express';
import { createPayment } from '../controllers/payment/createPayment.js'; // Ensure this matches exactly
import authMiddleware from '../middlewares/authMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/payments', authMiddleware, createPayment); 

export default paymentRouter;