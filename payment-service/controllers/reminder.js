const Payment = require('../models/Payment');
const Notification = require('../models/Notification');

exports.sendPaymentReminders = async (req, res) => {
    const userId = req.user.id;

    try {
        const payments = await Payment.find({ userId, status: 'pending' });

        // Here you would implement logic to send reminders (e.g., email notifications)
        for (const payment of payments) {
            const message = `Reminder: Payment of ${payment.amount} ${payment.currency} is due.`;
            const notification = new Notification({ userId, message, type: 'reminder' });
            await notification.save();
        }

        res.status(200).json({ message: 'Payment reminders sent', payments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};