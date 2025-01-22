import Payment from '../models/historyPaymentModels.js'; // Import the Payment model

// Function to get a student's payment history
const getPaymentHistory = async (req, res) => {
    const studentId = req.user.id; // Get the student's ID from the request
    const { startDate, endDate, status } = req.query; // Get filters like date range or status from the URL

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
        res.status(500).json({ message: error.message });
    }
};

export { getPaymentHistory }; // Export this function so it can be used elsewhere
