import express from 'express';
import makePayment from './paymentRoutes.js'; 

const api = express.Router(); 

api.use('/payments', makePayment);

export default api; 