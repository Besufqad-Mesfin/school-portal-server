import express from 'express';
import { createPayment } from '../controllers/createPayment.js'; // Ensure this matches exactly
import authMiddleware from '../middlewares/authMiddleware.js';

const makePayment = express.Router();

paymentRouter.post('/payments', authMiddleware, createPayment); 

export default makePayment;