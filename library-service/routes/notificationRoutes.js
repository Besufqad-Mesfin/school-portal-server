const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Notification routes
router.post('/due-date-reminder', authMiddleware, notificationController.sendDueDateReminder);
router.post('/new-arrivals', authMiddleware, notificationController.announceNewArrivals);
router.post('/general-alert', authMiddleware, notificationController.sendGeneralAlerts);

module.exports = router;