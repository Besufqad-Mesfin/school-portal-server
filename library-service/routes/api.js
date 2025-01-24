import express from 'express'; // Import Express
import fineRoutes from './routes/fineRoutes.js'; // Import fine routes

const api = express.Router(); // Create a new router for the API

// Middleware to parse JSON body
api.use(express.json());

//fine routes
api.use('/fines', fineRoutes); // Add fine routes

export default api; // Export the API router