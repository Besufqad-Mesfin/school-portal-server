import Payment from '../models/createPaymentModels.js'; // Import Payment model to check for upcoming payments

// Function to send reminders for unpaid or upcoming payments
export const sendPaymentReminder = async (req, res) => {
    const { studentId } = req.body;  // Get the student ID from the request body (the user asking for a reminder)

    try {
        // Get all upcoming or pending payments for this student from the database
        const upcomingPayments = await Payment.findAll({
            where: {
                studentId: studentId,  // Find payments for this student
                status: 'pending',      // Payments that are still pending
                createdAt: {
                    [Sequelize.Op.gt]: new Date()  // Get payments that are due in the future
                }
            },
            order: [['createdAt', 'ASC']]  // Order by the earliest payment
        });

        // If there are no upcoming payments
        if (upcomingPayments.length === 0) {
            return res.status(200).json({ message: 'No upcoming payments for this student.' });
        }

        // Loop through each upcoming payment and send a reminder (in a real case, you could email the student)
        const reminders = upcomingPayments.map(payment => {
            return {
                studentId: payment.studentId,
                amount: payment.amount,
                dueDate: payment.createdAt,
                message: `Reminder: Your payment of ${payment.amount} is due on ${payment.createdAt}. Please make sure to pay before the due date.`
            };
        });

        // Send reminders back as a response (in a real-world scenario, you'd send this via email or SMS)
        res.status(200).json({ message: 'Reminder(s) sent successfully!', reminders });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};
