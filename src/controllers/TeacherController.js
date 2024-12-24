const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();

// Mock database for teachers
const teachers = [];

// Generate a unique ID for new teachers
let nextId = 1;

// Register endpoint for teachers
router.post('/register', async (req, res) => {
    const { name, email, department, subject, password } = req.body;

    // Validate input fields
    if (!name || !email || !department || !subject) {
        return res.status(400).json({ message: 'Please fill in all required fields (name, email, department, subject).' });
    }

    // Check if email already exists
    const existingTeacher = teachers.find(teacher => teacher.email === email);
    if (existingTeacher) {
        return res.status(409).json({ message: 'Email already exists. Please choose a different email.' });
    }

    try {
        const generatedPassword = password || crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        const newTeacher = {
            id: nextId++,
            name: name,
            email: email,
            department: department,
            subject: subject,
            password: hashedPassword
        };

        teachers.push(newTeacher);
        res.status(201).json({
            message: 'Teacher registered successfully! Password has been generated.',
            teacherId: newTeacher.id,
            name: newTeacher.name,
            email: newTeacher.email,
            generatedPassword
        });
    } catch (err) {
        console.error('Error registering teacher:', err);
        res.status(500).json({ message: 'Error registering teacher. Please try again later.' });
    }
});

module.exports = router;