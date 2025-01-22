import express from 'express';
const api = express.Router();


// Integrate payment verification routes
api.use('/payments', paymentVerificationRouter);
export default api;
