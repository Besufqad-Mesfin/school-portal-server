import express from 'express'; // Import Express
import { addBook, updateBook,generateUsageReports,
    calculateFines,deleteBook, getBooks, searchBooks,borrowBook,returnBook } from '../controllers/bookControllers.js'; // Import book controller
import authMiddleware from '../middlewares/authMiddleware.js'; 
const bookRoutes = express.Router();
bookRoutes.post('/addBook',  addBook); 
bookRoutes.put('/updateBook:bookId', updateBook); 
bookRoutes.delete('/deleteBook:bookId', deleteBook); 
bookRoutes.get('/getBooks',  getBooks); 
bookRoutes.get('/searchBooks',  searchBooks); 
bookRoutes.post('/borrow', borrowBook);
bookRoutes.post('/return',  returnBook);
bookRoutes.get('/usage', generateUsageReports);

export default bookRoutes; // Export the router
