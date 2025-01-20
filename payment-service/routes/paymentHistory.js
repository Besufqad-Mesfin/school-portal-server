const express = require('express');
const router = express.Router();
const paymentHistory = require('../payment/paymentHistory');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/payments', authMiddleware, paymentHistory.getPayments);

module.exports = router;