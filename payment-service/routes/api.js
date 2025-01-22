// api.js
import express from 'express';
import reminderRouter from './reminderRoutes';  // Import the reminder route

const api = express.Router();

// Use the reminder route
api.use('/payments', reminderRouter);  

export default api;
