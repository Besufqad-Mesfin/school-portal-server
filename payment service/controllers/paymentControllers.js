import Payment from '../models/paymentModels';  // Ensure the path is correct

const createPayment = async (req, res) => {
    const {studentId, amount, currency, type } = req.body;

    try {
        // new payment record in the database
        const payment = await Payment.create({
            studentId, 
            amount,   
            currency,  
            type,      
        });

        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createPayment }; 
