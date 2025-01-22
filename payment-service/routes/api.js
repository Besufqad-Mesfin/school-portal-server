import express from 'express';
import receiptRoutes from './receiptPayment.js'; // Import the receipt routes

const api = express.Router();

// Use the receipt routes under the `/receipts` path
api.use('/receipts', receiptRoutes);

export default api;
