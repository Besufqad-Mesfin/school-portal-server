import Student from '../models/studentRegisterModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const studentRegister = async (req, res) => {
  const { fullName, email, grade, guardianContact, password } = req.body;

  // Validate required fields
  if (!fullName || !email || !grade || !guardianContact) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields (fullName, email, grade, guardianContact).',
    });
  }

  // Split the full name into firstName and lastName
  const [firstName, lastName] = fullName.split(' ');

  try {
    // Check if the email already exists
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists. Please choose a different email.',
      });
    }

    // Generate password if not provided
    const generatedPassword = password || crypto.randomBytes(8).toString('hex');

    // Hash the password
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create a new student record in the database
    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      grade,
      guardianContact,
      password: hashedPassword,
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Student registered successfully!',
      student: {
        id: newStudent.id,
        studentId: newStudent.studentId,
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        email: newStudent.email,
        grade: newStudent.grade,
        guardianContact: newStudent.guardianContact,
      },
      generatedPassword, // Include generated password for reference
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering student. Please try again later.',
    });
  }
};

export { studentRegister };
