import express from 'express'; // Import Express
import transactionRoutes from './routes/transactionRoutes.js'; // Import transaction routes

const api = express.Router(); // Create a new router for the API

// Middleware to parse JSON body
api.use(express.json());

// Use transaction routes under the '/transactions' path
api.use('/transactions', transactionRoutes);

export default api; // Export the API router