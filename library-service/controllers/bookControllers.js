import Book from '../models/bookModels.js'; // Import the Book model
import User from '../models/userModels.js'; // Import the User model
import Sequelize from 'sequelize'; // Import Sequelize for query operations

// Function to add a new book
export const addBook = async (req, res) => {
    const { title, author, isbn, totalCopies } = req.body; // Destructure the required fields
    try {
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
        const book = await Book.findByPk(bookId);
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
        const books = await Book.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { title: { [Sequelize.Op.like]: `%${query}%` } },
                    { author: { [Sequelize.Op.like]: `%${query}%` } },
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
