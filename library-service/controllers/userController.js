const User = require('../models/User');

exports.registerStudent = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStudentHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const transactions = await Transaction.find({ userId }).populate('bookId');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.blockStudent = async (req, res) => {
    // Logic to block a student based on criteria
};