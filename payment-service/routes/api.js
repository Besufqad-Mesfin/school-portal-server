import express from 'express';
import refundPayment from './refundPayment.js';

const api = express.Router();

api.use('/payment', refundPayment);

export default api;
