const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    amount: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    dateIssued: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fine', fineSchema);