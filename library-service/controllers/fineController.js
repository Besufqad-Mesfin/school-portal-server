const Transaction = require('../models/Transaction');

exports.calculateFines = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        
        const today = new Date();
        let fine = 0;
        if (!transaction.returnDate && today > transaction.dueDate) {
            const daysOverdue = Math.ceil((today - transaction.dueDate) / (1000 * 60 * 60 * 24));
            fine = daysOverdue * 0.5; // Example fine rate
        }

        res.status(200).json({ fine });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.payFines = async (req, res) => {
    // Logic to process fine payments
};

exports.viewFines = async (req, res) => {
    // Logic to view pending fines for a student
};