const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    const { title, author, isbn, totalCopies } = req.body;
    try {
        const book = new Book({ title, author, isbn, totalCopies, availableCopies: totalCopies });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    const { bookId } = req.params;
    const updates = req.body;
    try {
        const book = await Book.findByIdAndUpdate(bookId, updates, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await Book.findByIdAndDelete(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.getBooks = async (req, res) => {
//     try {
//         const books = await Book.find();
//         res.status(200).json(books);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.searchBooks = async (req, res) => {
    const { query } = req.query;
    try {
        const books = await Book.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { author: { $regex: query, $options: 'i' } }, { isbn: query }] });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};