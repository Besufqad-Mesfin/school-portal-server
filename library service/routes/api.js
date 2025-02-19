import express from 'express';
import bookRoutes from './bookRoutes.js';
// Import other routes if necessary

const api = express.Router();

// Middleware to parse JSON body
api.use(express.json());

// Use reporting routes
api.use('/book', bookRoutes);

// Include other routes as needed

export default api;
