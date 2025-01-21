import express from 'express';
import historyPayment from './historyPayment.js'; // Ensure this matches exactly

const api = express.Router();

// Use the historyPayment router for '/payments' route
api.use('/payments', historyPayment);

export default api;