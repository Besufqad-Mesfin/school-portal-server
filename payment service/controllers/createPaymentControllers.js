import Payment from '../models/createPaymentModels';  // Ensure the path is correct

const createPayment = async (req, res) => {
    const { amount, currency, type } = req.body;
    const studentId = req.user.id; // Access the authenticated student's ID from the middleware

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
