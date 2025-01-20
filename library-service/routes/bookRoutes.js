const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

// Book routes
router.post('/', authMiddleware, bookController.addBook);
router.put('/:bookId', authMiddleware, bookController.updateBook);
router.delete('/:bookId', authMiddleware, bookController.deleteBook);
router.get('/', authMiddleware, bookController.getBooks);
router.get('/search', authMiddleware, bookController.searchBooks);

module.exports = router;