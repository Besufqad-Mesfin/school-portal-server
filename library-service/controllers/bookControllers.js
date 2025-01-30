import Book from '../models/bookModels.js'; // Import the Book model
import { Op } from 'sequelize';
// Function to add a new book
export const addBook = async (req, res) => {
    const { title, author, isbn, availableCopies } = req.body; // Destructure the required fields
    try {
        // Create a new book instance
        const book = await Book.create({ title, author, isbn, availableCopies});
        res.status(201).json(book); // Respond with the created book
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to update an existing book
import Book from '../models/bookModels.js'; // Import the Book model

// Function to update an existing book
export const updateBook = async (req, res) => {
    const { bookId } = req.params; // Get bookId from route parameters
    const { title, author, isbn,  availableCopies } = req.body; // Destructure the update fields

    try {
        // Find the book by its ID
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' }); // Handle book not found
        }

        // Update the book with new details using destructured values
        await book.update({ title, author, isbn, availableCopies }); // No need to call save()

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
