// reminderRoutes.js
import express from 'express';
import { sendPaymentReminder } from '../controllers/reminderPaymentControllers.js';  // Import the controller

const reminderRouter = express.Router();

// Set up the route to send reminders
reminderRouter.post('/reminders', sendPaymentReminder);

export default reminderRouter;
