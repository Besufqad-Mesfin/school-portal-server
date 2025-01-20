const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Transaction routes
router.post('/borrow', authMiddleware, transactionController.borrowBook);
router.post('/return', authMiddleware, transactionController.returnBook);
router.get('/borrowed', authMiddleware, transactionController.viewBorrowedBooks);
router.post('/overdue-notifications', authMiddleware, transactionController.sendOverdueNotifications);

module.exports = router;