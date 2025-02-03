import Payment from '../models/paymentModels';
import { Sequelize } from 'sequelize';
import BookTransaction from '../../library service/models/bookTransaction';
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

export const calculateFines = async (req, res) => {
    const { borrowTransactionId } = req.body;  
    try {
        const transaction = await BookTransaction.findByPk(borrowTransactionId);  
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const today = new Date();
        let fine = 0;
        if (!transaction.returnDate && today > transaction.dueDate) {
            const daysOverdue = Math.ceil((today - transaction.dueDate) / (1000 * 60 * 60 * 24));
            fine = daysOverdue * 0.5; 
        }
        if (fine > 100) {
            fine = 100;
        }
        await Payment.upsert({
            borrowTransactionId,  
            amount: fine,
            paid: false
        });

        res.status(200).json({ fine });
    } catch (error) {
        console.error("Error processing refund request:", error);
        res.status(500).json({ message: error.message });
    }
};

// Function to verify a payment record
export const verifyPayment = async (req, res) => {
    const { paymentId, isValid } = req.body; // Extract paymentId and isValid directly from the request body

    try {
        // Find the payment record by its ID
        const payment = await Payment.findByPk(paymentId); // `findByPk` fetches record by primary key
        if (!payment) {
            // If payment is not found, respond with a 404 error
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Update payment status based on the isValid flag
        payment.status = isValid ? 'completed' : 'failed';

        // Save the updated payment record to the database
        await payment.save();

        // Respond with a success message and the updated payment record
        res.status(200).json({ message: 'Payment verified successfully', payment });
    } catch (error) {
        // Handle any errors during the process and respond with a 500 error
        console.error("Error verifying payment:", error); // Logs detailed error for debugging
        res.status(500).json({ message: error.message });
    }
};
