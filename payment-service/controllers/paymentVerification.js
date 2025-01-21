import Payment from '../models/verificationPayment.js'; // Ensure the path and extension are correct
import paymentProcessorAPI from '../services/paymentProcessorAPI.js'; // Hypothetical API service

export const verifyPayment = async (req, res) => {
    const { studentId } = req.body;

    try {
        const payment = await Payment.findByPk(studentId); // Use findByPk for Sequelize
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Call the external payment processor API to verify payment status
        const verificationResponse = await paymentProcessorAPI.verifyPayment(studentId);

        // Check the response from the payment processor
        switch (verificationResponse.status) {
            case 'successful':
                payment.status = 'completed';
                break;
            case 'pending':
                payment.status = 'pending';
                break;
            case 'failed':
                payment.status = 'failed';
                break;
            default:
                payment.status = 'unknown';
        }

        await payment.save();
        res.status(200).json({ message: 'Payment verified successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};