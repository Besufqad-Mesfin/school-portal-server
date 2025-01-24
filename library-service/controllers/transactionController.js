const Transaction = require('../models/transactionModels');
const Book = require('../models/Book');

exports.borrowBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id;
    try {
        const book = await Book.findById(bookId);
        if (!book || book.availableCopies < 1) {
            return res.status(400).json({ message: 'Book not available for borrowing' });
        }
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 2 weeks from now

        const transaction = new Transaction({ userId, bookId, dueDate });
        await transaction.save();

        book.availableCopies -= 1; // Decrease available copies
        await book.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.returnBook = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.returnDate = new Date();
        await transaction.save();

        const book = await Book.findById(transaction.bookId);
        book.availableCopies += 1; // Increase available copies
        await book.save();

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.viewBorrowedBooks = async (req, res) => {
    const userId = req.user.id;

    try {
        const transactions = await Transaction.find({ userId, returnDate: null }).populate('bookId');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendOverdueNotifications = async (req, res) => {
    // Logic to send notifications for overdue books
};