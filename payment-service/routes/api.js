import express from 'express';
import paymentVerify from './verficationPayment';
const api = express.Router();

api.use('/payment', paymentVerify);

export default api;
