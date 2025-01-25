import express from 'express';
import { createPayment ,getPaymentHistory } from '../controllers/paymentControllers'; 
import authMiddleware from '../Middleware/authMiddleware.js'; 

const paymentRoutes = express.Router(); 

paymentRoutes.post('/create-payment', authMiddleware, createPayment); 
paymentRoutes.post('/history', authMiddleware, getPaymentHistory); 

export default paymentRoutes; // Export the route to use in api.js