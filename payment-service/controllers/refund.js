import { Refund } from '../models/refund.js'; // Ensure correct import

export const requestRefund = async (req, res) => {
    const { paymentId } = req.body;

    try {
        const payment = await Payment.findByPk(paymentId); // Use findByPk for Sequelize
        if (!payment || payment.status !== 'completed') {
            return res.status(400).json({ message: 'Invalid refund request' });
        }

        const refund = await Refund.create({
            paymentId,
            studentId: payment.userId,
            amount: payment.amount,
            status: 'pending'
        });

        payment.status = 'refunded'; // Update status in Payment
        await payment.save();

        res.status(200).json({ message: 'Refund request processed successfully', refund });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};