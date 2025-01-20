const Payment = require('../models/Payment');

exports.verifyPayment = async (req, res) => {
    const { paymentId } = req.body;

    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Simulate payment verification logic here (e.g., check status with payment processor)
        payment.status = 'completed'; // Example: Mark it as completed
        await payment.save();
        res.status(200).json({ message: 'Payment verified successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};