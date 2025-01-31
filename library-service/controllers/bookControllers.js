import Book from '../models/bookModels.js'; // Import the Book model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { Op } from 'sequelize'; // Import Sequelize operators
import nodemailer from 'nodemailer';

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
    const { bookId } = req.params;
    const { title, author, isbn, totalCopies, availableCopies } = req.body; // Destructure the update fields

    // Check for empty or missing fields
    if (!title || !author || !isbn || !availableCopies) {
        return res.status(400).json({ message: 'at least one (title, author, isbn,  availableCopies) are required.' });
    }

    try {
        // Find the book by its ID
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' }); // Handle book not found
        }

        // Update the book with new details
        await book.update({ title, author, isbn, totalCopies, availableCopies }); // No need to call save()

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

    // Check if the search query is empty
    if (!query) {
        return res.status(400).json({ message: "Search query cannot be empty" });
    }

    try {
        // Search for books by title, author, or ISBN
        const books = await Book.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { author: { [Op.like]: `%${query}%` } },
                    { isbn: query }
                ]
            },
            limit: 10, // Limit results to 10 books
            order: [["title", "ASC"]] // Sort results by title (A to Z)
        });

        res.status(200).json(books); // Respond with the search results
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to register a new user

export const registerUser = async (req, res) => {
    const { username, idNumber, role, password } = req.body;
    try {
        if (!username || !idNumber || !role || !password) {
            return res.status(400).json({ message: 'All fields (username, idNumber, role, password) are required.' });
        }

        if (!['student', 'librarian', 'volunteer'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Must be student, librarian, or volunteer.' });
        }
        const existingUser = await User.findOne({ where: { idNumber } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = await User.create({ username, idNumber, role, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};



export const borrowBook = async (req, res) => {
    const { bookId, studentId } = req.body; 
    try {
        const book = await Book.findByPk(bookId);
        if (!book || book.availableCopies < 1) {
            return res.status(400).json({ message: 'Book not available for borrowing' });
        }

        const existingTransaction = await Transaction.findOne({ where: { studentId, bookId, returned: false } });
        if (existingTransaction) {
            return res.status(400).json({ message: 'You have already borrowed this book.' });
        }
        const borrowedBooksCount = await Transaction.count({ where: { studentId, returned: false } });
        if (borrowedBooksCount >= 3) {
            return res.status(400).json({ message: 'You can only borrow 3 books at a time.' });
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


export const returnBook = async (req, res) => {
    const { transactionId } = req.body;
    try {
        const transaction = await Transaction.findByPk(transactionId);
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



export const sendDueDateReminder = async (req, res) => {
    const { studentId, message } = req.body;

    try {
        const notification = new Notification({
            studentId,
            message,
            type: 'due_date_reminder'
        });
        await notification.save();

        const user = await User.findByPk(studentId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', 
                pass: 'your-email-password' 
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: user.email, 
            subject: 'Library Due Date Reminder',
            text: message 
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};


export const announceNewArrivals = async (req, res) => {
    const { message } = req.body;  
    try {
        const students = await User.findAll(); 

        const notifications = students.map(student => {
            return new Notification({
                studentId: student.id,  
                message,
                type: 'new_arrival'
            }).save();
        });

        await Promise.all(notifications);

        res.status(201).json({ message: 'Notifications sent to all students successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



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
            fine = daysOverdue * 0.5; 
        }
        if (fine > 100) {
            fine = 100;
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
        if (fine.paid) {
            return res.status(400).json({ message: 'Fine has already been paid' });
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
    const studentId = req.body;

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

// Function to generate usage reports
export const generateUsageReports = async (req, res) => {
    try {
        const totalTransactions = await Transaction.count();
        const totalBooks = await Book.count();
        const totalStudent = await Book.count();

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
