import Payment from '../models/paymentModels.js';
import { Sequelize } from 'sequelize';
import BookTransaction from '../../library service/models/BookTransaction.js';
const generateReceiptNumber = () => {
    return 'ReceiptNumber-' + Math.random().toString(36).substr(2, 8).toUpperCase();
};

export const createPayment = async (req, res) => {
    const {
        studentId, amount, type, paymentMethod = 'cash', bankName, transactionId, accountNumber,
    } = req.body;

    if (!studentId || !amount || !type) {
        return res.status(400).json({ message: "Student ID, amount, and type are required." });
    }

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number." });
    }

    if (paymentMethod === 'bank_transfer') {
        if (!transactionId || !bankName) {
            return res.status(400).json({ message: "Bank name and transaction ID are required for bank transfers." });
        }

        const existingPayment = await Payment.findOne({ where: { transactionId } });
        if (existingPayment) {
            return res.status(400).json({ message: "Transaction ID already exists." });
        }
    }

    try {
        const receiptNumber = generateReceiptNumber();

        const payment = await Payment.create({
            studentId,
            amount,
            type,
            paymentMethod,
            bankName: paymentMethod === 'bank_transfer' ? bankName : null,
            transactionId: paymentMethod === 'bank_transfer' ? transactionId : null,
            accountNumber: paymentMethod === 'bank_transfer' ? accountNumber : null,
            status: paymentMethod === 'bank_transfer' ?'completed':'pending', 
            paymentDate: new Date(),
            receiptNumber,
            receiptDate: new Date(),

        });

        return res.status(201).json({
            message: "Payment successfully created.",
            payment,
        });
    } catch (error) {

        console.error("Error creating payment:", error);
        return res.status(500).json({
            message: "An error occurred while creating the payment.",
            error: error.message,
        });
    }
};


export const getPaymentHistory = async (req, res) => {
    const { studentId } = req.body; 
    const { startDate, endDate, status } = req.query; 

    if (!studentId) {
        return res.status(400).json({ message: "Student ID is required." });
    }

    try {
        const filter = { studentId };

        if (startDate || endDate) {
            filter.paymentDate = {};
            if (startDate) filter.paymentDate[Sequelize.Op.gte] = new Date(startDate);
            if (endDate) filter.paymentDate[Sequelize.Op.lte] = new Date(endDate);
        }


        if (status) {
            filter.status = status;
        }

        const payments = await Payment.findAll({
            where: filter,
            order: [['paymentDate', 'DESC']],
        });

        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({ message: "An error occurred while retrieving payment history.", error: error.message });
    }
};

export const requestRefund = async (req, res) => {
    const { paymentId } = req.body;

    if (!paymentId) {
        return res.status(400).json({ message: "Payment ID is required." });
    }

    try {
        const payment = await Payment.findByPk(paymentId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }

        if (payment.status !== 'completed') {
            return res.status(400).json({ message: "Only completed payments can be refunded." });
        }

        const paymentDate = new Date(payment.paymentDate);
        const currentDate = new Date();
        const daysSincePayment = Math.ceil((currentDate - paymentDate) / (1000 * 60 * 60 * 24));

        let refundAmount = payment.amount;

        if (daysSincePayment > 7) {
            const daysOverdue = daysSincePayment - 7;
            const penaltyPercentage = daysOverdue * 0.10; 
            refundAmount = Math.max(0, payment.amount * (1 - penaltyPercentage));
        }

        payment.refundStatus = 'pending';
        payment.refundAmount = refundAmount;
        payment.refundDate = new Date();
        payment.status = 'refunded';
        await payment.save();

        res.status(200).json({
            message: 'Refund request processed successfully.',
            refundDetails: {
                paymentId: payment.paymentId,
                refundAmount: payment.refundAmount,
                refundDate: payment.refundDate,
                refundStatus: payment.refundStatus,
            },
        });
    } catch (error) {
        console.error("Error processing refund request:", error);
        res.status(500).json({ message: error.message });
    }
};

export const calculateFines = async (req, res) => {
    const { borrowTransactionId } = req.body;  
    try {
        const transaction = await BookTransaction.findByPk(borrowTransactionId);  
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const today = new Date();
        let fine = 0;

        // Check if the book has been returned
        if (!transaction.returnDate) {
            // Check if the due date has passed
            if (today > transaction.dueDate) {
                const daysOverdue = Math.ceil((today - transaction.dueDate) / (1000 * 60 * 60 * 24));
                fine = daysOverdue * 0.5; // Example: $0.5 per day
                if (fine > 100) {
                    fine = 100; // Cap the fine at $100
                }
            }
        }

        // If the due date is not reached, fine remains 0
        res.status(200).json({ fine });
    } catch (error) {
        console.error("Error calculating fines:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getPayment = async (req, res) => {
    try {
        const pays = await Payment.findAll(); 
        res.status(200).json(pays); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

