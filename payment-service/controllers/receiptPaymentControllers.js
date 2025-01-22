import Receipt from '../models/receiptPaymentModels.js'; // Ensure correct import
import Payment from '../models/createPaymentModels.js'; // Import the Payment model for checking payment details

// Function to generate a receipt for a payment
export const generateReceipt = async (req, res) => {
    const { paymentId } = req.params; // Get paymentId from request parameters

    try {
        // Find the payment associated with the given paymentId
        const payment = await Payment.findByPk(paymentId);

        // Check if the payment exists and is successful
        if (!payment || payment.status !== 'completed') {
            return res.status(400).json({ message: 'Payment not found or not completed' });
        }

        // Generate a unique receipt number (you can use any method for this)
        const receiptNumber = `RECEIPT-${paymentId}-${Date.now()}`;

        // Create the receipt record in the database
        const receipt = await Receipt.create({
            paymentId: payment.id, // Link the receipt to the payment
            receiptNumber,
            amount: payment.amount, // Store the payment amount in the receipt
        });

        // Return the receipt data to the user
        res.status(201).json({
            message: 'Receipt generated successfully',
            receipt: {
                receiptNumber: receipt.receiptNumber,
                amount: receipt.amount,
                dateIssued: receipt.dateIssued,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
