const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    dateBorrowed: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date }
});

module.exports = mongoose.model('Transaction', transactionSchema);