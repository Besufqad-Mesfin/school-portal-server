import express from 'express';
import { createPayment, getPaymentHistory, requestRefund,getPayment, verifyPayment, calculateFines } from '../controllers/paymentControllers.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const paymentRoutes = express.Router(); 

paymentRoutes.post('/create-payment',  createPayment); 
paymentRoutes.post('/history/:studentId',  getPaymentHistory); 
paymentRoutes.post('/request-refund',  requestRefund);
paymentRoutes.post('/calculate-fines', calculateFines);
paymentRoutes.post('/verify-payment/:paymentId', verifyPayment);
paymentRoutes.get('/getPayment',getPayment);

export default paymentRoutes;
