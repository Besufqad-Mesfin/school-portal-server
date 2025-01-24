import express from 'express';
import reportController from '../controllers/reportController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Reporting routes
router.get('/usage', authMiddleware, reportController.generateUsageReports);
router.get('/popular-books', authMiddleware, reportController.viewPopularBooks);
router.get('/student-activity', authMiddleware, reportController.monitorStudentActivity);

export default router;