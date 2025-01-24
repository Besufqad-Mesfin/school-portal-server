import User from '../models/userModels.js'; // Import the User model

// Function to register a new user (student, librarian, or volunteer)
export const registerUser = async (req, res) => {
    const { username, idNumber, role } = req.body; // Destructure the required fields

    // Validate role
    if (!['student', 'librarian', 'volunteer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Must be student, librarian, or volunteer.' });
    }

    try {
        const user = await User.create({ username, idNumber, role }); // Create a new user
        res.status(201).json({ message: 'User registered successfully', user }); // Respond with success
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};