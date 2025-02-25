import express from 'express';
import paymentRoutes from './paymentRoutes.js'; 
const api = express.Router(); 


api.use('/payment', paymentRoutes);

export default api; 
