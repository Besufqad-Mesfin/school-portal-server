import Fine from '../models/fineModels.js'; // Import the Fine model
import Transaction from '../models/transactionModels.js'; // Import the Transaction model

export const calculateFines = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findByPk(transactionId); // Use findByPk for Sequelize
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        
        const today = new Date();
        let fine = 0;
        if (!transaction.returnDate && today > transaction.dueDate) {
            const daysOverdue = Math.ceil((today - transaction.dueDate) / (1000 * 60 * 60 * 24));
            fine = daysOverdue * 0.5; // Example fine rate
        }

        // Create or update fine record
        await Fine.upsert({
            transactionId,
            amount: fine,
            paid: false
        });

        res.status(200).json({ fine });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const payFines = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const fine = await Fine.findOne({ where: { transactionId } });
        if (!fine) {
            return res.status(404).json({ message: 'Fine not found' });
        }

        fine.paid = true; // Mark fine as paid
        await fine.save(); // Save updated fine record

        res.status(200).json({ message: 'Fine paid successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const viewFines = async (req, res) => {
    const studentId = req.user.id;

    try {
        const fines = await Fine.findAll({
            where: { paid: false },
            include: [{
                model: Transaction,
                where: { studentId } // Assuming Transaction model has studentId
            }]
        });
        
        res.status(200).json(fines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};