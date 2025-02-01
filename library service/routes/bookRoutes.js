import express from 'express'; // Import Express
import { addBook, updateBook,generateUsageReports,
    calculateFines,deleteBook, getBooks, searchBooks,
    announceNewArrivals,sendDueDateReminder ,borrowBook,returnBook } from '../controllers/bookControllers.js'; // Import book controller
import authMiddleware from '../middlewares/authMiddleware.js'; 
const bookRoutes = express.Router();
bookRoutes.post('/addBook',  addBook); // Route to add a new book
bookRoutes.put('/updateBook:bookId', updateBook); // Route to update a book by ID
bookRoutes.delete('/deleteBook:bookId', deleteBook); // Route to delete a book by ID
bookRoutes.get('/getBooks',  getBooks); // Route to get all books
bookRoutes.get('/searchBooks',  searchBooks); // Route to search for books
bookRoutes.post('/borrow', borrowBook);
bookRoutes.post('/return',  returnBook);
bookRoutes.post('/due-date-reminder',  sendDueDateReminder);
bookRoutes.post('/new-arrivals',  announceNewArrivals);
bookRoutes.post('/calculate',  calculateFines);
bookRoutes.get('/usage', generateUsageReports);

export default bookRoutes; // Export the router
