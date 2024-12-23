const express = require('express');
const router = express.Router();

// Mock database of students
const users = [
    { id: 1, username: 'student1', password: 'password123' },
    { id: 2, username: 'student2', password: 'password456' }
];

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ message: 'Login successful', userId: user.id });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;