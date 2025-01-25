import express from 'express';
import { generateReceipt } from '../controllers/receiptPaymentControllers.js'; // Ensure correct import
import authMiddleware from '../middlewares/authMiddleware.js'; // Middleware for authentication

const router = express.Router();

// Define the route for generating a receipt
// This route uses a paymentId as a parameter
router.post('/receipts/:paymentId', authMiddleware, generateReceipt);

export default router;
