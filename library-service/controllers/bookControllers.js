import Book from '../models/bookModels.js'; // Import the Book model
import User from '../models/userModels.js'; // Import the User model
import Transaction from '../models/transactionModels.js'; // Import the Transaction model
import Notification from '../models/Notification.js'; // Import the Notification model
import Fine from '../models/bookModels.js'; // Import the Fine model
import Sequelize from 'sequelize'; // Import Sequelize for query operations

// Function to add a new book
export const addBook = async (req, res) => {
    const { title, author, isbn, totalCopies } = req.body;
    try {
        const book = await Book.create({ title, author, isbn, totalCopies, availableCopies: totalCopies });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update an existing book
export const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const updates = req.body;
    try {
        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.update(updates);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a book
export const deleteBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to search for books
export const searchBooks = async (req, res) => {
    const { query } = req.query;
    try {
        const books = await Book.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { title: { [Sequelize.Op.like]: `%${query}%` } },
                    { author: { [Sequelize.Op.like]: `%${query}%` } },
                    { isbn: query }
                ]
            }
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to register a new user
export const registerUser = async (req, res) => {
    const { username, idNumber, role } = req.body;

    if (!['student', 'librarian', 'volunteer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Must be student, librarian, or volunteer.' });
    }

    try {
        const user = await User.create({ username, idNumber, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to borrow a book
export const borrowBook = async (req, res) => {
    const { bookId } = req.body;
    const studentId = req.user.id;

    try {
        const book = await Book.findByPk(bookId);
        if (!book || book.availableCopies < 1) {
            return res.status(400).json({ message: 'Book not available for borrowing' });
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);

        const transaction = await Transaction.create({ studentId, bookId, dueDate });

        book.availableCopies -= 1;
        await book.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to return a borrowed book
export const returnBook = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.returnDate = new Date();
        await transaction.save();

        const book = await Book.findByPk(transaction.bookId);
        book.availableCopies += 1;
        await book.save();

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to view borrowed books
export const viewBorrowedBooks = async (req, res) => {
    const studentId = req.user.id;

    try {
        const transactions = await Transaction.findAll({
            where: { studentId, returnDate: null },
            include: [{ model: Book }]
        });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to send due date reminder
export const sendDueDateReminder = async (req, res) => {
    const { userId, message } = req.body;

    try {
        const notification = new Notification({
            userId,
            message,
            type: 'due_date_reminder'
        });
        await notification.save();

        // Logic to send the notification (e.g., email, SMS) would go here

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to announce new arrivals
export const announceNewArrivals = async (req, res) => {
    const { users, message } = req.body;

    try {
        const notifications = [];

        for (const userId of users) {
            const notification = new Notification({
                userId,
                message,
                type: 'new_arrival'
            });
            notifications.push(notification.save());
        }

        await Promise.all(notifications);
        res.status(201).json({ message: 'Notifications sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to calculate fines
export const calculateFines = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const today = new Date();
        let fine = 0;
        if (!transaction.returnDate && today > transaction.dueDate) {
            const daysOverdue = Math.ceil((today - transaction.dueDate) / (1000 * 60 * 60 * 24));
            fine = daysOverdue * 0.5; // Example fine rate
        }

        await Fine.upsert({
            transactionId,
            amount: fine,
            paid: false
        });

        res.status(200).json({ fine });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to pay fines
export const payFines = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const fine = await Fine.findOne({ where: { transactionId } });
        if (!fine) {
            return res.status(404).json({ message: 'Fine not found' });
        }

        fine.paid = true;
        await fine.save();

        res.status(200).json({ message: 'Fine paid successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to view fines
export const viewFines = async (req, res) => {
    const studentId = req.user.id;

    try {
        const fines = await Fine.findAll({
            where: { paid: false },
            include: [{
                model: Transaction,
                where: { studentId }
            }]
        });

        res.status(200).json(fines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
