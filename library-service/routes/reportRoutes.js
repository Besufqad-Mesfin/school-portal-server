const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

// Reporting routes
router.get('/usage', authMiddleware, reportController.generateUsageReports);
router.get('/popular-books', authMiddleware, reportController.viewPopularBooks);
router.get('/student-activity', authMiddleware, reportController.monitorStudentActivity);

module.exports = router;