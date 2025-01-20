const express = require('express');
const router = express.Router();
const createPayment = require('../payment/createPayment');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/payments', authMiddleware, createPayment.createPayment);

module.exports = router;




