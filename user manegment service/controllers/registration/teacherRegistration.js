import bcrypt from 'bcrypt';
import { TeacherRegistrationModel } from '../../models/teacherModel.js';

const registerTeacher = async (req, res) => {
    const { First_name,Last_name, email,teacher_Id,educational_Status, password, subject,Gender,Contact_info } = req.body;

    // Validate required fields
    if (!First_name ||Last_name|| !email ||teacher_Id|| !password || !subject||educational_Status||Gender||Contact_info) {
        return res.status(400).json({ message: 'Name, email, password, and subject are required.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save teacher to the database
        const newTeacher = await TeacherRegistrationModel.create({
            name,
            email,
            subject,
        });



        res.status(201).json({ message: 'Teacher registered successfully!', teacher: newTeacher });
    } catch (error) {
        console.error('Error registering teacher:', error);

        // Handle unique constraint violation (e.g., duplicate email)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        res.status(500).json({ message: 'An error occurred while registering the teacher.' });
    }
};

export default registerTeacher;
