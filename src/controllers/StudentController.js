const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const router = express.Router();

// Mock database for students
const students = [];

// Generate a unique ID for new students
let nextId = 1;

// Register endpoint for students
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, course, password } = req.body;

    // Validate input fields
    if (!firstName || !lastName || !email || !course) {
        return res.status(400).json({ message: 'Please fill in all required fields (firstName, lastName, email, course).' });
    }

    // Check if email already exists
    const existingStudent = students.find(student => student.email === email);
    if (existingStudent) {
        return res.status(409).json({ message: 'Email already exists. Please choose a different email.' });
    }

    try {
        const generatedPassword = password || crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        const newStudent = {
            id: nextId++,
            firstName: firstName,
            lastName: lastName,
            email: email,
            course: course,
            password: hashedPassword
        };

        students.push(newStudent);
        res.status(201).json({
            message: 'Student registered successfully! Password has been generated.',
            studentId: newStudent.id,
            username: `${firstName} ${lastName}`,
            email: newStudent.email,
            generatedPassword
        });
    } catch (err) {
        console.error('Error registering student:', err);
        res.status(500).json({ message: 'Error registering student. Please try again later.' });
    }
});

module.exports = router;