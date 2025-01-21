import Payment from '../models/historyPaymentModels.js'; // Ensure the path and extension are correct
import { Op } from 'sequelize'; // Import Op for query operators

const getPayments = async (req, res) => {
    const studentId = req.user.id;
    const { startDate, endDate, status } = req.query;

    try {
        const query = {
            where: { studentId },
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

export { getPayments };