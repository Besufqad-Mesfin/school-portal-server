import express from 'express';
import { createPayment } from '../controllers/createPaymentControllers.js'; 

import authMiddleware from '../middlewares/authMiddleware.js'; 

const makePayment = express.Router(); 

makePayment.post('/payments', authMiddleware, createPayment); 

export default makePayment; // Export the route to use in api.js
