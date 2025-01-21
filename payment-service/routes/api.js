import express from 'express';

const api = express.Router();

api.use('/payment', verificationPaymet);

export default api;
