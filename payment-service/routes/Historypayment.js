import express from 'express';
import { getPayments } from '../controllers/paymentHistory.js'; // Ensure this matches exactly
import authMiddleware from '../middlewares/authMiddleware.js';

const historyPayment = express.Router();

historyPayment.get('/history', authMiddleware, getPayments); 

export default historyPayment;