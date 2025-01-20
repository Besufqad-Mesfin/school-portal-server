const express = require('express');
const router = express.Router();
const createPayment = require('../payment/createPayment');
const paymentHistory = require('../payment/paymentHistory');
const paymentVerification = require('../payment/paymentVerification');
const refund = require('../payment/refund');
const reminder = require('../payment/reminder');
const receipt = require('../payment/receipt');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/payments', authMiddleware, createPayment.createPayment);
router.get('/payments', authMiddleware, paymentHistory.getPayments);
router.post('/verify', authMiddleware, paymentVerification.verifyPayment);
router.post('/refund', authMiddleware, refund.requestRefund);
router.get('/reminders', authMiddleware, reminder.sendPaymentReminders);
router.get('/receipt/:paymentId', authMiddleware, receipt.generateReceipt);

module.exports = router;