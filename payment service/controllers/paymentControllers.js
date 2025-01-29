import Payment from '../models/paymentModels'; // Import the Payment model

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
                $between: [new Date(startDate), new Date(endDate)], // Between the start and end dates
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

