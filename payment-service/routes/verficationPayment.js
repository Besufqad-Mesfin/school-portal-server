import express from 'express';
import { verifyPayment } from '../controllers/paymentVerification.js'; // Ensure this matches exactly
import authMiddleware from '../middlewares/authMiddleware.js';

const paymentVerify = express.Router();

paymentVerify.post('/verify', authMiddleware, verifyPayment); 

export default paymentVerify;