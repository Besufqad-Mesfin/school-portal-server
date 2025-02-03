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

export default router;