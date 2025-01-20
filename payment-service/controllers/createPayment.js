const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
    const { amount, currency, type } = req.body;
    const userId = req.user.id;

    try {
        const payment = new Payment({ userId, amount, currency, type });
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};