import express from 'express';
import notificationController from '../controllers/notificationController.js';

const router = express.Router();

// Route to get student grade notifications
router.get('/student/:studentId/grades', getStudentGradeNotifications);

// Route to get general announcements notifications
router.get('/announcements', getAnnouncements);

// Route to get teacher assignment notifications
router.get('/teacher/:teacherId/assignments', getTeacherAssignmentNotifications);

// Route to get admin alert notifications
router.get('/admin/:adminId/alerts', getAdminAlertNotifications);

// send notification to student
router.post('/send', sendNotification);

// bulk send notifications
router.post('/bulk', bulkSendNotifications);

// mark notification as read
router.patch('/:notificationId/read', markNotificationAsRead);

// mark notification as unread
router.patch('/:notificationId/unread', markNotificationAsUnread);

// bulk mark notifications as read
router.patch('/bulk/read', bulkMarkNotificationsAsRead);

// bulk mark notifications as unread
router.patch('/bulk/unread', bulkMarkNotificationsAsUnread);

// delete notification
router.delete('/:notificationId', deleteNotification);

// bulk delete notifications
router.delete('/bulk', bulkDeleteNotifications);

// update notification
router.put('/:notificationId', updateNotification);

// update notification settings
router.put('/settings/:userId', updateNotificationSettings);



export default router;