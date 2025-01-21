import Payment from '../models/verificationPayment.js'; // Ensure the path and extension are correct
import paymentProcessorAPI from '../services/paymentProcessorAPI.js'; // Hypothetical API service

export const verifyPayment = async (req, res) => {
    const { paymentId } = req.body;
           // it will be foreing key of studentId
    try {
        const payment = await Payment.findByPk(paymentId); // Use findByPk for Sequelize
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Call the external payment processor API to verify payment status
        const verificationResponse = await paymentProcessorAPI.verifyPayment(paymentId);
        
        // Check the response from the payment processor
        if (verificationResponse.status === 'successful') {
            payment.status = 'completed';
        } else if (verificationResponse.status === 'pending') {
            payment.status = 'pending';
        } else {
            payment.status = 'failed';
        }

        await payment.save();
        res.status(200).json({ message: 'Payment verified successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};