import User from '../models/userModels.js'; // Import the User model
import Transaction from '../models/transactionModels.js'; // Import Transaction model

// Function to register a new student
export const registerStudent = async (req, res) => {
    const { username, idNumber } = req.body; // Destructure the required fields

    try {
        const user = await User.create({ username, idNumber }); // Create a new user
        res.status(201).json({ message: 'User registered successfully', user }); // Respond with success
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to get student transaction history
export const getStudentHistory = async (req, res) => {
    const userId = req.user.id; // Get userId from the authenticated request

    try {
        const transactions = await Transaction.findAll({ where: { userId }, include: ['bookId'] }); // Fetch transactions for the user
        res.status(200).json(transactions); // Respond with the transaction history
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};