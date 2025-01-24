import express from 'express'; // Import Express
import * as transactionController from '../controllers/transactionController.js'; // Import transaction controller
import authMiddleware from '../middlewares/authMiddleware.js'; // Import authentication middleware

const transactionRoutes = express.Router(); // Create a new router

// Transaction routes
transactionRoutes.post('/borrow', authMiddleware, transactionController.borrowBook);
transactionRoutes.post('/return', authMiddleware, transactionController.returnBook);
transactionRoutes.get('/borrowed', authMiddleware, transactionController.viewBorrowedBooks);

export default transactionRoutes; // Export the router