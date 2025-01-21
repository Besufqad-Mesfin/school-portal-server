import Payment from '../models/createPaymentModels.js'; // Ensure the path and extension are correct

const createPayment = async (req, res) => {
    const { amount, currency, type } = req.body;
    const userId = req.user.id;

    try {
        const payment = await Payment.create({ userId, amount, currency, type });
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export  {createPayment};