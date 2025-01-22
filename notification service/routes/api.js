import express from 'express';
import { createNotification, getNotifications, updateNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/notifications', createNotification);
router.get('/notifications', getNotifications);
router.put('/notifications/:id', updateNotification);

export default router;
