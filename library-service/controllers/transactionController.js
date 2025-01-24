import Transaction from '../models/transactionModels.js'; // Import the Transaction model
import Book from '../models/bookModels.js'; // Import the Book model

export const borrowBook = async (req, res) => {
    const { bookId } = req.body;
    const studentId = req.user.id; // Changed userId to studentId

    try {
        const book = await Book.findByPk(bookId);
        if (!book || book.availableCopies < 1) {
            return res.status(400).json({ message: 'Book not available for borrowing' });
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 2 weeks from now

        const transaction = await Transaction.create({ studentId, bookId, dueDate }); // Create transaction

        book.availableCopies -= 1; // Decrease available copies
        await book.save(); // Save updated book

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const returnBook = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.returnDate = new Date(); // Set return date
        await transaction.save(); // Save updated transaction

        const book = await Book.findByPk(transaction.bookId);
        book.availableCopies += 1; // Increase available copies
        await book.save(); // Save updated book

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const viewBorrowedBooks = async (req, res) => {
    const studentId = req.user.id; // Changed userId to studentId

    try {
        const transactions = await Transaction.findAll({
            where: { studentId, returnDate: null },
            include: [{ model: Book }] // Include book details in response
        });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

