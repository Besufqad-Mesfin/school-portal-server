import nodemailer from 'nodemailer';
import Payment from '../models/paymentModels'; // Import the Payment model
import { Sequelize } from 'sequelize'; // Import Sequelize for database operations

// Configure the email sender (Use a real email service in production)
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use another email provider
    auth: {
        user: 'your-email@gmail.com',  // Replace with your email
        pass: 'your-email-password'    // Use an app password for security
    }
});

// Function to create a new payment
export const createPayment = async (req, res) => {
    const { studentId, amount, type } = req.body;

    // Validate required fields
    if (!studentId || !amount || !type) {
        return res.status(400).json({ message: "Student ID, amount, and type are required." });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number." });
    }

    try {
        // Create a new payment record in the database
        const payment = await Payment.create({
            studentId,
            amount,
            type,
            status: 'pending', // Default status for new payments
            paymentDate: new Date(), // Automatically adds payment timestamp
        });

        return res.status(201).json({
            message: "Payment successfully created.",
            payment,
        });
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({ 
            message: "An error occurred while creating the payment.",
            error: error.message,
        });
    }
};

// Function to get a student's payment history
export const getPaymentHistory = async (req, res) => {
    const { studentId } = req.params; // Use req.params instead of req.body
    const { startDate, endDate, status } = req.query; // Use query parameters

    if (!studentId) {
        return res.status(400).json({ message: "Student ID is required." });
    }

    try {
        const filter = { studentId };

        if (startDate && endDate) {
            filter.paymentDate = {
                [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }

        if (status) {
            filter.status = status;
        }

        const payments = await Payment.findAll({
            where: filter,
            order: [['paymentDate', 'DESC']],
        });

        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({ message: "An error occurred while retrieving payment history.", error: error.message });
    }
};

// Function to send reminders for unpaid or upcoming payments
export const sendPaymentReminder = async (req, res) => {
    const { studentId, email } = req.body;  // Get student ID and email

    if (!studentId || !email) {
        return res.status(400).json({ message: "Student ID and email are required." });
    }

    try {
        // Find pending payments with a future due date
        const upcomingPayments = await Payment.findAll({
            where: {
                studentId,
                status: 'pending',
                dueDate: { [Sequelize.Op.gt]: new Date() }, // Payments due in the future
            },
            order: [['dueDate', 'ASC']], // Sort by due date (earliest first)
        });

        if (upcomingPayments.length === 0) {
            return res.status(200).json({ message: 'No upcoming payments for this student.' });
        }

        // Loop through payments and send an email for each
        for (const payment of upcomingPayments) {
            const mailOptions = {
                from: 'your-email@gmail.com',  // Replace with your email
                to: email,
                subject: 'Payment Reminder - School Fee',
                text: `Dear Student,\n\nThis is a reminder that your payment of ${payment.amount} Birr is due on ${payment.dueDate}.\n\nPlease make sure to pay before the due date to avoid any penalties.\n\nThank you.`,
            };

            // Send email
            await transporter.sendMail(mailOptions);
        }

        res.status(200).json({ message: 'Reminder(s) sent successfully via email!' });
    } catch (error) {
        console.error("Error sending payment reminders:", error);
        res.status(500).json({ message: "Failed to send email reminders.", error: error.message });
    }
};

// Function to request a refund for a payment
export const requestRefund = async (req, res) => {
    const { paymentId } = req.body;

    if (!paymentId) {
        return res.status(400).json({ message: "Payment ID is required." });
    }

    try {
        const payment = await Payment.findByPk(paymentId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }

        if (payment.status !== 'completed') {
            return res.status(400).json({ message: "Only completed payments can be refunded." });
        }

        // Create a refund record
        const refund = await Refund.create({
            paymentId,
            studentId: payment.studentId,
            amount: payment.amount,
            status: 'pending',
        });

        // Update the payment status
        payment.status = 'refunded';
        await payment.save();

        res.status(200).json({
            message: 'Refund request processed successfully.',
            refund,
        });
    } catch (error) {
        console.error("Error processing refund request:", error);
        res.status(500).json({ message: error.message });
    }
};
