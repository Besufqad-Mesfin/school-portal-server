import express from 'express';
import refundRouter from './refund.js'; // Refund routes

const api = express.Router();

// Integrate routes
api.use('/refunds', refundRouter); // Refund-related routes

export default api;
