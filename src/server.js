const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import the student controller
const studentController = require('./controllers/StudentController');
app.use('/api/students', studentController);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`School server is running on http://localhost:${PORT}`);
});