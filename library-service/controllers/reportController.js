const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User');

exports.generateUsageReports = async (req, res) => {
    try {
        const totalTransactions = await Transaction.countDocuments();
        const totalBooks = await Book.countDocuments();
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            totalTransactions,
            totalBooks,
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.viewPopularBooks = async (req, res) => {
    try {
        const popularBooks = await Transaction.aggregate([
            { $group: { _id: '$bookId', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }, // Get top 5 popular books
            { $lookup: { from: 'books', localField: '_id', foreignField: '_id', as: 'bookDetails' } }
        ]);

        res.status(200).json(popularBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.monitorStudentActivity = async (req, res) => {
    const userId = req.user.id;

    try {
        const transactions = await Transaction.find({ userId }).populate('bookId');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};