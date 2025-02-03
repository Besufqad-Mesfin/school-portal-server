import express from 'express';
import paymentRoutes from './paymentRoutes.js'; 
const api = express.Router(); 


api.use('/api', paymentRoutes);

export default api; 
