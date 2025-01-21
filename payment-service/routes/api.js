import express from 'express';
import verificationPaymet from './verficationPayment';
const api = express.Router();

api.use('/payment', verificationPaymet);

export default api;
