import express from 'express';
import reportController from '../controllers/reportController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const reportRoutes = express.Router();

// Reporting routes
reportRoutes.get('/usage', authMiddleware, reportController.generateUsageReports);
reportRoutes.get('/popular-books', authMiddleware, reportController.viewPopularBooks);
reportRoutes.get('/student-activity', authMiddleware, reportController.monitorStudentActivity);

export default reportRoutes;