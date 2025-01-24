import express from 'express'; // Import Express
import userRoutes from './userRoutes.js'; // Import user routes

const api = express.Router(); // Create a new router for API

// Use user routes under the '/users' path
api.use('/users', userRoutes);

export default api; // Export the API router