import express from 'express'; // Import Express
import { addBook, updateBook, deleteBook, getBooks,registerUser, searchBooks ,registerUser,borrowBook,returnBook,viewBorrowedBooks } from '../controllers/bookControllers.js'; // Import book controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const bookRoutes = express.Router(); // Create a new router

// Define book routes
bookRoutes.post('/addBook', addBook); // Route to add a new book
bookRoutes.put('/updateBook:bookId',  updateBook); // Route to update a book by ID
bookRoutes.delete('/deleteBook:bookId', deleteBook); // Route to delete a book by ID
bookRoutes.get('/getBooks', getBooks); // Route to get all books
bookRoutes.get('/searchBooks', searchBooks); // Route to search for books
bookRoutes.post('/register-user', registerUser);
bookRoutes.post('/borrow', borrowBook);
bookRoutes.post('/return', returnBook);

export default bookRoutes; // Export the router
