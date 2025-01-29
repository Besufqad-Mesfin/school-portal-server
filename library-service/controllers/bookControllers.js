import Book from '../models/bookModels.js'; // Import the Book model
import { Op } from 'sequelize'; // Import Sequelize operators

// Function to add a new book
export const addBook = async (req, res) => {
    const { title, author, isbn, totalCopies } = req.body; // Destructure the required fields
    try {
        // Create a new book instance
        const book = await Book.create({ title, author, isbn, totalCopies, availableCopies: totalCopies });
        res.status(201).json(book); // Respond with the created book
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to update an existing book
export const updateBook = async (req, res) => {
    const { bookId } = req.params; // Get bookId from route parameters
    const updates = req.body; // Get updates from the request body
    try {
        // Update the book instance
        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' }); // Handle book not found

        await book.update(updates); // Apply updates to the book
        res.status(200).json(book); // Respond with the updated book
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to delete a book
export const deleteBook = async (req, res) => {
    const { bookId } = req.params; // Get bookId from route parameters
    try {
        const book = await Book.findByPk(bookId); // Find the book by ID
        if (!book) return res.status(404).json({ message: 'Book not found' }); // Handle book not found

        await book.destroy(); // Delete the book
        res.status(204).send(); // Respond with no content
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll(); // Fetch all books
        res.status(200).json(books); // Respond with the list of books
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to search for books
export const searchBooks = async (req, res) => {
    const { query } = req.query; // Get the search query from request parameters
    try {
        // Search for books by title, author, or ISBN
        const books = await Book.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { author: { [Op.like]: `%${query}%` } },
                    { isbn: query }
                ]
            }
        });
        res.status(200).json(books); // Respond with the search results
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to register a new user
export const registerUser = async (req, res) => {
    const { username, idNumber, role } = req.body; // Destructure the required fields

    // Validate role
    if (!['student', 'librarian', 'volunteer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Must be student, librarian, or volunteer.' });
    }

    try {
        const user = await User.create({ username, idNumber, role }); // Create a new user
        res.status(201).json({ message: 'User registered successfully', user }); // Respond with success
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to borrow a book
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

// Function to return a book
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

// Function to send a due date reminder notification
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
    const { users, message } = req.body; // Assume users is an array of user IDs

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

// Function to calculate fines for overdue books
export const calculateFines = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findByPk(transactionId); // Use findByPk for Sequelize
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const today = new Date();
        let fine = 0;
        if (!transaction.returnDate && today > transaction.dueDate) {
            const daysOverdue = Math.ceil((today - transaction.dueDate) / (1000 * 60 * 60 * 24));
            fine = daysOverdue * 0.5; // Example fine rate
        }

        // Create or update fine record
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

        fine.paid = true; // Mark fine as paid
        await fine.save(); // Save updated fine record

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
                where: { studentId } // Assuming Transaction model has studentId
            }]
        });

        res.status(200).json(fines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to generate usage reports
export const generateUsageReports = async (req, res) => {
    try {
        const totalTransactions = await Transaction.count();
        const totalBooks = await Book.count();
        const totalStudent = await User.count();

        res.status(200).json({
            totalTransactions,
            totalBooks,
            totalStudent
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to view popular books
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
