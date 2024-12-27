import bcrypt from 'bcrypt';
import  teacherModel from '../../models/teacherModel.js';

const registerTeacher = async (req, res) => {
    const {
        First_name,
        Last_name,
        email,
        teacher_Id,
        educational_Status,
        password,
        subject,
        Gender,
        Contact_no,
    } = req.body;

    // Validate required fields
    if (
        !First_name ||
        !Last_name ||
        !email ||
        !teacher_Id ||
        !educational_Status ||
        !password ||
        !subject ||
        !Gender ||
        !Contact_no
    ) {
        return res.status(400).json({
            message: 'All fields are required: First_name, Last_name, email, teacher_Id, educational_Status, password, subject, Gender, and Contact_no.',
        });
    }

    try {
        // Check if email or teacher_Id already exists
        const existingTeacher = await teacherModel.findOne({
            where: {
                [Op.and]: [
                    { email: email },
                    { teacher_Id: teacher_Id },
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
            First_name,
            Last_name,
            email,
            teacher_Id,
            educational_Status,
            password: hashedPassword, // Save hashed password
            subject,
            Gender,
            Contact_no,
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
