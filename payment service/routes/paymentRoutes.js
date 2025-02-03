import express from 'express';
import { createPayment ,getPaymentHistory, requestRefund,calculateFines } from '../controllers/paymentControllers'; 
import authMiddleware from '../Middleware/authMiddleware.js'; 

const paymentRoutes = express.Router(); 

paymentRoutes.post('/create-payment',  createPayment); 
paymentRoutes.post('/history',  getPaymentHistory); 
paymentRoutes.post('/request-refund',  requestRefund);
paymentRoutes.post('/calculate-fines', calculateFines);
export default paymentRoutes; 
