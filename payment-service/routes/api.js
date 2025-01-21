import express from 'express';
import makePayment from './payment'

const api = express.Router();

api.use('/payments', makePayment);

export default api;
