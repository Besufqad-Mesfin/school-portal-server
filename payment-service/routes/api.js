import express from 'express';
import historyPayment from './historyPayment';
const api = express.Router();

api.use('/history', historyPayment);

export default api;
