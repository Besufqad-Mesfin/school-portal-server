const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Mock database
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];
// Routes
// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});
// Get a user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Create a new user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
