import express from 'express';
import { 
    getStudentGradeNotifications, 
    getAnnouncements, 
    getStudentUnreadNotifications, 
    getTeacherNotifications, 
    getTeacherUnreadNotificationCount, 
    getTeacherUnreadNotifications, 
    getAdminUnreadNotifications, 
    getAdminNotifications, 
    postAdminAlertNotification, 
    postTeacherAssignmentNotification, 
    sendNotification, 
    bulkSendNotifications, 
    markNotificationAsRead, 
    markNotificationAsUnread, 
    bulkMarkNotificationsAsRead, 
    bulkMarkNotificationsAsUnread, 
    deleteNotification, 
    bulkDeleteNotifications, 
} from '../controllers/notificationController.js';

const router = express.Router();

// Student Notifications
router.get('/student/:studentId/grades', getStudentGradeNotifications);
router.get('/student/:studentId/unread', getStudentUnreadNotifications);

// Teacher Notifications
router.get('/teacher/:teacherId', getTeacherNotifications);
router.get('/teacher/:teacherId/unread-count', getTeacherUnreadNotificationCount);
router.get('/teacher/:teacherId/unread', getTeacherUnreadNotifications);
router.post('/teacher/:teacherId/assignments', postTeacherAssignmentNotification);

// Admin Notifications
router.get('/admin/:adminId/unread', getAdminUnreadNotifications);
router.get('/admin/:adminId', getAdminNotifications);
router.post('/admin/:adminId/alerts', postAdminAlertNotification);

// General Notifications
router.get('/announcements', getAnnouncements);
router.post('/send', sendNotification);
router.post('/bulk', bulkSendNotifications);

// Mark Notifications as Read/Unread
router.patch('/:notificationId/read', markNotificationAsRead);
router.patch('/:notificationId/unread', markNotificationAsUnread);
router.patch('/bulk/read', bulkMarkNotificationsAsRead);
router.patch('/bulk/unread', bulkMarkNotificationsAsUnread);

// Delete Notifications
router.delete('/:notificationId', deleteNotification);
router.delete('/bulk', bulkDeleteNotifications);

// Update Notifications


export default router;
