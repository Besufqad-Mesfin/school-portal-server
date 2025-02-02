import Book from '../models/bookModels.js'; 
import Student from '../../user manegment service/models/studentModels.js';
import BookTransaction from '../models/bookTransactionModel.js'; // Import BookTransaction
import { Op } from 'sequelize';

export const addBook = async (req, res) => {
    const { title, author, isbn, availableCopies } = req.body; 
    if (!title || !author || !isbn || !availableCopies) {
        return res.status(400).json({ message: 'at least one (title, author, isbn, availableCopies) are required.' });
    }
    try {
        const book = await Book.create({ title, author, isbn, availableCopies });
        res.status(201).json(book); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const { title, author, isbn, totalCopies, availableCopies } = req.body; 
    if (!title || !author || !isbn || !availableCopies) {
        return res.status(400).json({ message: 'at least one (title, author, isbn, availableCopies) are required.' });
    }

    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' }); 
        }

        await book.update({ title, author, isbn, totalCopies, availableCopies }); 
        res.status(200).json(book); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

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

export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll(); 
        res.status(200).json(books); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchBooks = async (req, res) => {
    const { query } = req.query; 
    if (!query) {
        return res.status(400).json({ message: "Search query cannot be empty" });
    }

    try {
        const books = await Book.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { author: { [Op.like]: `%${query}%` } },
                    { isbn: query }
                ]
            },
            limit: 10, 
            order: [["title", "ASC"]] 
        });

        res.status(200).json(books); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const borrowBook = async (req, res) => {
    const { bookId, studentId } = req.body; 
    try {
        const book = await Book.findByPk(bookId);
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (!book || book.availableCopies < 1) {
            return res.status(400).json({ message: 'Book not available for borrowing' });
        }

        const existingTransaction = await BookTransaction.findOne({ where: { studentId, bookId, returned: false } });
        if (existingTransaction) {
            return res.status(400).json({ message: 'You have already borrowed this book.' });
        }
        const borrowedBooksCount = await BookTransaction.count({ where: { studentId, returned: false } });
        if (borrowedBooksCount >= 3) {
            return res.status(400).json({ message: 'You can only borrow 3 books at a time.' });
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); 
        const transaction = await BookTransaction.create({ studentId, bookId, dueDate });
        book.availableCopies -= 1;
        await book.save(); 
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const returnBook = async (req, res) => {
    const { transactionId } = req.body;
    try {
        const transaction = await BookTransaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        if (transaction.returnDate) {
            return res.status(400).json({ message: 'This book has already been returned.' });
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

export const generateUsageReports = async (req, res) => {
    try {
        const totalTransactions = await BookTransaction.count();
        const totalBooks = await Book.count();
        const totalStudents = await Student.count(); 

        res.status(200).json({
            totalTransactions,
            totalBooks,
            totalStudents 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};