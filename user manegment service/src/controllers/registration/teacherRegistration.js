import bcrypt from 'bcryptjs';
import teacherModel from '../../models/teacherModel.js'; // Adjusted to match your model file name
import { Op } from 'sequelize'; // Import Sequelize operators

const registerTeacher = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        teacherId,
        educationalStatus,
        password,
        subject,
        gender,
        contactNo,
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
                [Op.or]: [ // Changed to `Op.or` to check for either email or teacherId
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
            firstName,       // Corresponds to the model's firstName
            lastName,        // Corresponds to the model's lastName
            email,           // Corresponds to the model's email
            teacherId,       // Corresponds to the model's teacherId
            educationalStatus, // Corresponds to the model's educationalStatus
            password: hashedPassword, // Store hashed password in the model
            subject,         // Corresponds to the model's subject
            gender,          // Corresponds to the model's gender
            contactNo,       // Corresponds to the model's contactNo
        });

        const { password: teacherPassword, ...teacher } = newTeacher.toJSON(); // Exclude password from the response
        res.status(201).json({
            message: 'Teacher registered successfully!',
            teacher: teacher,
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
