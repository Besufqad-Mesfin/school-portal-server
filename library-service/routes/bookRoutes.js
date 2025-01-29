import express from 'express'; // Import Express
import { addBook, updateBook,viewFines,calculateFines,payFines, deleteBook, getBooks, searchBooks,sendGeneralAlerts,announceNewArrivals,sendDueDateReminder ,registerUser,borrowBook,returnBook,viewBorrowedBooks } from '../controllers/bookControllers.js'; // Import book controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const bookRoutes = express.Router(); // Create a new router

// Define book routes
bookRoutes.post('/addBook', authMiddleware, addBook); // Route to add a new book
bookRoutes.put('/updateBook:bookId', authMiddleware, updateBook); // Route to update a book by ID
bookRoutes.delete('/deleteBook:bookId', authMiddleware, deleteBook); // Route to delete a book by ID
bookRoutes.get('/getBooks', authMiddleware, getBooks); // Route to get all books
bookRoutes.get('/searchBooks', authMiddleware, searchBooks); // Route to search for books
bookRoutes.post('/register-user',authMiddleware, registerUser);
bookRoutes.post('/borrow', authMiddleware, borrowBook);
bookRoutes.post('/return', authMiddleware, returnBook);
bookRoutes.get('/borrowed', authMiddleware, viewBorrowedBooks);
bookRoutes.post('/due-date-reminder', authMiddleware, sendDueDateReminder);
bookRoutes.post('/new-arrivals', authMiddleware, announceNewArrivals);
bookRoutes.post('/calculate', authMiddleware, calculateFines);
bookRoutes.get('/view-Fines', authMiddleware, viewFines);
bookRoutes.post('/pay-Fines', authMiddleware, payFines);

export default bookRoutes; // Export the router
