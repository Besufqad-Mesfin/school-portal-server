import Payment from '../models/paymentModels'; // Import the Payment model
import { Sequelize } from 'sequelize'; // Import Sequelize for database operations

// Function to create a new payment
export const createPayment = async (req, res) => {
    const { studentId, amount, currency = 'USD', type } = req.body;

    // Validate required fields
    if (!studentId || !amount || !type) {
        return res.status(400).json({ 
            message: "Student ID, amount, and type are required." 
        });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ 
            message: "Amount must be a positive number." 
        });
    }

    try {
        // Create a new payment record in the database
        const payment = await Payment.create({
            studentId,
            amount,
            currency,
            type,
            paymentDate: new Date(), // Automatically adds payment timestamp
        });

        return res.status(201).json({
            message: "Payment successfully created.",
            payment,
        });
    } catch (error) {
        console.error("Error creating payment:", error); // Logs detailed error for debugging
        return res.status(500).json({ 
            message: "An error occurred while creating the payment.",
            error: error.message,
        });
    }
};

// Function to get a student's payment history
export const getPaymentHistory = async (req, res) => {
    const { studentId, startDate, endDate, status } = req.body; // Get filters like date range or status from the URL

    try {
        // Set up rules for finding payments
        const filter = {
            studentId, // Find only payments for this student
        };

        // If the user gives a start and end date, add them as a rule
        if (startDate && endDate) {
            filter.createdAt = {
                [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)], // Between the start and end dates
            };
        }

        // If the user gives a status (like "completed"), add it as a rule
        if (status) {
            filter.status = status;
        }

        // Get the payments that match these rules from the database
        const payments = await Payment.findAll({
            where: filter, // Apply the rules we made
            order: [['createdAt', 'DESC']], // Sort payments from newest to oldest
        });

        // Send the found payments back to the user
        res.status(200).json(payments);
    } catch (error) {
        // If something goes wrong, send an error message
        console.error("Error fetching payment history:", error);
        res.status(500).json({ message: "An error occurred while retrieving payment history.", error: error.message });
    }
};

// Function to send reminders for unpaid or upcoming payments
export const sendPaymentReminder = async (req, res) => {
    const { studentId } = req.body;  // Get the student ID from the request body (the user asking for a reminder)

    try {
        // Get all upcoming or pending payments for this student from the database
        const upcomingPayments = await Payment.findAll({
            where: {
                studentId,  // Find payments for this student
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

        // Loop through each upcoming payment and send a reminder
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
        console.error("Error sending payment reminders:", error); // Logs detailed error for debugging
        res.status(500).json({ message: error.message });
    }
};

// Function to request a refund for a payment
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
        console.error("Error processing refund request:", error); // Logs detailed error for debugging
        res.status(500).json({ message: error.message });
    }
};

// Function to generate a receipt for a completed payment
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
