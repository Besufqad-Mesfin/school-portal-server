const Payment = require('../models/Payment');
const Refund = require('../models/Refund');

exports.requestRefund = async (req, res) => {
    const { paymentId } = req.body;

    try {
        const payment = await Payment.findById(paymentId);
        if (!payment || payment.status !== 'completed') {
            return res.status(400).json({ message: 'Invalid refund request' });
        }

        const refund = new Refund({
            paymentId,
            userId: payment.userId,
            amount: payment.amount,
            status: 'pending'
        });
        await refund.save();

        payment.status = 'refunded'; // Update status in Payment
        await payment.save();

        res.status(200).json({ message: 'Refund request processed successfully', refund });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};