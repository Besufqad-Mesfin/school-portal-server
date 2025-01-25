import Payment from '../models/verificationPaymentModels.js'; // Import the Payment model
import paymentProcessorAPI from '../services/paymentProcessorAPI.js'; // Hypothetical external API for payment verification

/**
 * Controller to verify a payment record using an external payment processor API.
 * Updates the payment status based on the API response.
 */
export const verifyPayment = async (req, res) => {
    const { paymentId } = req.body; // Extract paymentId from the request body (assumed as a foreign key to studentId)

    try {
        // Find the payment record by its ID
        const payment = await Payment.findByPk(paymentId); // `findByPk` fetches record by primary key
        if (!payment) {
            // If payment is not found, respond with a 404 error
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Call the external payment processor API to verify the payment
        const verificationResponse = await paymentProcessorAPI.verifyPayment(paymentId);

        // Update payment status based on the API response
        if (verificationResponse.status === 'successful') {
            payment.status = 'completed'; // Payment successfully processed
        } else if (verificationResponse.status === 'pending') {
            payment.status = 'pending'; // Payment still in progress
        } else {
            payment.status = 'failed'; // Payment failed
        }

        // Save the updated payment record to the database
        await payment.save();

        // Respond with a success message and the updated payment record
        res.status(200).json({ message: 'Payment verified successfully', payment });
    } catch (error) {
        // Handle any errors during the process and respond with a 500 error
        res.status(500).json({ message: error.message });
    }
};
