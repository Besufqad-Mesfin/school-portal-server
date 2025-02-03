import express from 'express';
import reportRoutes from './routes/reportRoutes.js';
// Import other routes if necessary

const api = express.Router();

// Middleware to parse JSON body
api.use(express.json());

// Use reporting routes
api.use('/book', reportRoutes);

// Include other routes as needed

export default api;
