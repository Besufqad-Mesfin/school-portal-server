import bcrypt from 'bcryptjs';
import teacherModel from '../../models/teacherModel.js';
import { Op } from 'sequelize'; // Import Sequelize operators

const registerTeacher = async (req, res) => {
    const {
        firstName, // Updated to match the model's attribute
        lastName,  // Updated to match the model's attribute
        email,
        teacherId, // Updated to match the model's attribute
        educationalStatus, // Updated to match the model's attribute
        password,
        subject,
        gender, // Updated to match the model's attribute
        contactNo, // Updated to match the model's attribute
    } = req.body;

    // Validate required fields
    if (
        !firstName ||
        !lastName ||
        !email ||
        !teacherId ||
        !educationalStatus ||
        !password ||
        !subject ||
        !gender ||
        !contactNo
    ) {
        return res.status(400).json({
            message: 'All fields are required: firstName, lastName, email, teacherId, educationalStatus, password, subject, gender, and contactNo.',
        });
    }

    try {
        // Check if email or teacherId already exists
        const existingTeacher = await teacherModel.findOne({
            where: {
                [Op.or]: [ // Changed to `Op.or` to match either condition
                    { email: email },
                    { teacherId: teacherId },
                ],
            },
        });

        if (existingTeacher) {
            return res.status(400).json({
                message: 'A teacher with this email or teacher ID already exists.',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save teacher to the database
        const newTeacher = await teacherModel.create({
            firstName,       // Aligned to model
            lastName,        // Aligned to model
            email,
            teacherId,       // Aligned to model
            educationalStatus, // Aligned to model
            password: hashedPassword, // Save hashed password
            subject,
            gender,          // Aligned to model
            contactNo,       // Aligned to model
        });

        res.status(201).json({
            message: 'Teacher registered successfully!',
            teacher: newTeacher,
        });
    } catch (error) {
        console.error('Error registering teacher:', error);

        // Handle unique constraint violation (if not already caught above)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email or Teacher ID already exists.' });
        }

        res.status(500).json({ message: 'An error occurred while registering the teacher.' });
    }
};

export default registerTeacher;
