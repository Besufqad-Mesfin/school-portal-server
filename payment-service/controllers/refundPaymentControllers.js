import Payment from '../models/refundPaymentModels.js'; // Ensure correct import for Payment model
import Refund from '../models/refundModel.js'; // Separate Refund model if applicable

/**
 * Handles refund requests for a specific payment.
 * Updates the payment status and creates a corresponding refund record.
 */
export const requestRefund = async (req, res) => {
    const { paymentId } = req.body; // Extract payment ID from request body

    try {
        // Find the payment record by ID
        const payment = await Payment.findByPk(paymentId);

        // Validate if payment exists and its status is 'completed'
        if (!payment || payment.status !== 'completed') {
            return res.status(400).json({ message: 'Invalid refund request. Payment not found or not completed.' });
        }

        // Create a refund record
        const refund = await Refund.create({
            paymentId,
            studentId: payment.studentId, // Use studentId instead of userId
            amount: payment.amount,
            status: 'pending', // Initial refund status is 'pending'
        });

        // Update the payment status to 'refunded'
        payment.status = 'refunded';
        await payment.save(); // Save updated payment status

        // Send success response
        res.status(200).json({
            message: 'Refund request processed successfully.',
            refund,
        });
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ message: error.message });
    }
};
