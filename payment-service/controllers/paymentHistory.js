import Payment from '../models/historyPayment.js'; // Ensure the path and extension are correct

const getPayments = async (req, res) => {
    const userId = req.user.id;
    const { startDate, endDate, status } = req.query;

    try {
        const query = {
            where: { userId },
        };

        if (startDate || endDate) {
            query.where.createdAt = {};
            if (startDate) query.where.createdAt[Op.gte] = new Date(startDate);
            if (endDate) query.where.createdAt[Op.lte] = new Date(endDate);
        }
        if (status) query.where.status = status;

        const payments = await Payment.findAll(query);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {getPayments};