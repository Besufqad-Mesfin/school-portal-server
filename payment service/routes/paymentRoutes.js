import express from 'express';
import { createPayment ,getPaymentHistory, verifyPayment ,sendPaymentReminder,requestRefund } from '../controllers/paymentControllers'; 
import authMiddleware from '../Middleware/authMiddleware.js'; 

const paymentRoutes = express.Router(); 

paymentRoutes.post('/create-payment', authMiddleware, createPayment); 
paymentRoutes.post('/history', authMiddleware, getPaymentHistory); 
paymentRoutes.post('/verify-payment', authMiddleware, verifyPayment);
paymentRoutes.post('/send-reminder', authMiddleware, sendPaymentReminder);
paymentRoutes.post('/request-refund', authMiddleware, requestRefund);

export default paymentRoutes; // Export the route to use in api.js