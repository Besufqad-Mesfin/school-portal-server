import Book from '../models/bookModels.js'; 
import { Op } from 'sequelize';
// Function to add a new book
export const addBook = async (req, res) => {
    const { title, author, isbn, availableCopies } = req.body; // Destructure the required fields
    if (!title || !author || !isbn || !availableCopies) {
        return res.status(400).json({ message: 'at least one (title, author, isbn,  availableCopies) are required.' });
    }
    try {
        
        // Create a new book instance
        const book = await Book.create({ title, author, isbn, availableCopies });
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
