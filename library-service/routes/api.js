import express from 'express'; // Import Express
import bookRoutes from './bookRoutes.js'; // Import book routes

const api = express.Router(); // Create a new router for API

// Use book routes under the '/books' path
api.use('/books', bookRoutes);

export default api; // Export the API router
