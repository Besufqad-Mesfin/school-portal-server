import Transaction from '../models/Transaction.js';
import Book from '../models/Book.js';
import User from '../models/User.js';

export const generateUsageReports = async (req, res) => {
    try {
        const totalTransactions = await Transaction.count();
        const totalBooks = await Book.count();
        const totalUsers = await User.count();

        res.status(200).json({
            totalTransactions,
            totalBooks,
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const viewPopularBooks = async (req, res) => {
    try {
        const popularBooks = await Transaction.findAll({
            attributes: ['bookId', [sequelize.fn('COUNT', sequelize.col('bookId')), 'count']],
            group: ['bookId'],
            order: [[sequelize.fn('COUNT', sequelize.col('bookId')), 'DESC']],
            limit: 5,
            include: [{
                model: Book,
                attributes: ['id', 'title', 'author'] // Include necessary book details
            }]
        });

        res.status(200).json(popularBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const monitorStudentActivity = async (req, res) => {
    const userId = req.user.id;
    try {
        const transactions = await Transaction.findAll({
            where: { userId },
            include: [{
                model: Book,
                attributes: ['id', 'title']
            }]
        });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};