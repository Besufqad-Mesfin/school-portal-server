import express from 'express';
import { createPayment } from '../controllers/createPaymentControllers.js'; 

import authMiddleware from '../Middleware/authMiddleware.js'; 

const makePayment = express.Router(); 

makePayment.post('/', authMiddleware, createPayment); 

export default makePayment; // Export the route to use in api.js
