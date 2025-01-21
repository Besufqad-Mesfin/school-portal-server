import express from 'express';
import { getPayments } from '../controllers/payment/getPayments.js'; // Ensure this matches exactly
import authMiddleware from '../middlewares/authMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.get('/payments', authMiddleware, getPayments); 

export default paymentRouter;