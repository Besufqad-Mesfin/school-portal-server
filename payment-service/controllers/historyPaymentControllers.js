import Payment from '../models/historyPaymentModels.js'; // Import the Payment model

/**
 * Controller to retrieve the payment history for a student.
 * Allows filtering by date range and status.
 */
const getPaymentHistory = async (req, res) => {
    const studentId = req.user.id; // Get the authenticated student's ID from the request
    const { startDate, endDate, status } = req.query; // Extract optional filters from query parameters

    try {
        // Build a dynamic filter object for the query
        const filter = {
            studentId, // Only retrieve payments for the authenticated student
        };

        // Add date range filter if provided
        if (startDate && endDate) {
            filter.createdAt = {
                $between: [new Date(startDate), new Date(endDate)],
            };
        }

        // Add status filter if provided
        if (status) {
            filter.status = status;
        }

        // Query the database for payment history based on the filter
        const payments = await Payment.findAll({
            where: filter, // Apply the dynamic filter
            order: [['createdAt', 'DESC']], // Order by most recent payments first
        });

        // Respond with the retrieved payment records
        res.status(200).json(payments);
    } catch (error) {
        // Handle any errors and respond with an error message
        res.status(500).json({ message: error.message });
    }
};

export { getPaymentHistory }; // Export the controller function
