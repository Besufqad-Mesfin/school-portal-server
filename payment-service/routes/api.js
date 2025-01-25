import express from 'express';
import paymentHistoryRouter from './paymentHistory.js'; // Import payment history routes

const api = express.Router();


// Integrate payment history routes
api.use('/payments', paymentHistoryRouter);

export default api;
