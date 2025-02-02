import express from 'express';
import { createPayment ,getPaymentHistory, requestRefund } from '../controllers/paymentControllers'; 
import authMiddleware from '../Middleware/authMiddleware.js'; 

const paymentRoutes = express.Router(); 

paymentRoutes.post('/create-payment',  createPayment); 
paymentRoutes.post('/history',  getPaymentHistory); 
paymentRoutes.post('/request-refund',  requestRefund);

export default paymentRoutes; // Export the route to use in api.js