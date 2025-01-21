
import express from 'express';
import { requestRefund } from '../controllers/refund.js'; // Adjust the path accordingly
import authMiddleware from '../middlewares/authMiddleware.js';

const refundPayment = express.Router();

// Route for processing refund requests
refundPayment.post('/refund', authMiddleware, requestRefund);

export default refundPayment;