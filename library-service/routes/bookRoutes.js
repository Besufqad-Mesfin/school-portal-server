import express from 'express'; // Import Express
import { addBook, updateBook, deleteBook, getBooks, searchBooks } from '../controllers/bookControllers.js'; // Import book controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const bookRoutes = express.Router(); // Create a new router

// Define book routes
bookRoutes.post('/', authMiddleware, addBook); // Route to add a new book
bookRoutes.put('/:bookId', authMiddleware, updateBook); // Route to update a book by ID
bookRoutes.delete('/:bookId', authMiddleware, deleteBook); // Route to delete a book by ID
bookRoutes.get('/', authMiddleware, getBooks); // Route to get all books
bookRoutes.get('/search', authMiddleware, searchBooks); // Route to search for books

export default bookRoutes; // Export the router