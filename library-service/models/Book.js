const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    availableCopies: { type: Number, default: 1 },
    totalCopies: { type: Number, required: true }
});

module.exports = mongoose.model('Book', bookSchema);