import Payment from '../models/paymentModels';
import { Sequelize } from 'sequelize';

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
            status: paymentMethod === 'bank_transfer' ? 'pending' : 'completed', 
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
    const { studentId } = req.params; 
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

        payment.refundStatus = 'pending';
        payment.refundAmount = payment.amount;
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

export const generateReceipt = async (req, res) => {
    const { paymentId } = req.body;

    if (!paymentId) {
        return res.status(400).json({ message: "Payment ID is required to generate a receipt." });
    }
    try {
        const payment = await Payment.findByPk(paymentId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }

        if (payment.receiptNumber) {
            return res.status(400).json({ message: "Receipt already generated for this payment." });
        }

        payment.receiptNumber = generateReceiptNumber();
        payment.receiptDate = new Date();
        await payment.save();

        return res.status(200).json({
            message: "Receipt successfully generated.",
            receiptNumber: payment.receiptNumber,
            receiptDate: payment.receiptDate,
            paymentDetails: payment,
        });
    } catch (error) {
        console.error("Error generating receipt:", error);
        return res.status(500).json({ message: "An error occurred while generating the receipt.", error: error.message });
    }
};