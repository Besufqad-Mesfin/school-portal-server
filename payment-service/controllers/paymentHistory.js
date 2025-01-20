const Payment = require('../models/Payment');

exports.getPayments = async (req, res) => {
    const userId = req.user.id;
    const { startDate, endDate, status } = req.query;

    try {
        const query = { userId };
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }
        if (status) query.status = status;
        const payments = await Payment.find(query);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};