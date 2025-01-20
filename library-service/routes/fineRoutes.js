const express = require('express');
const router = express.Router();
const fineController = require('../controllers/fineController');
const authMiddleware = require('../middlewares/authMiddleware');

// Fine routes
router.post('/calculate', authMiddleware, fineController.calculateFines);
router.get('/', authMiddleware, fineController.viewFines);
router.post('/pay', authMiddleware, fineController.payFines);

module.exports = router;