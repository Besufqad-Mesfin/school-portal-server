import { Op } from 'sequelize'; // Include this line
import Student from '../../models/studentModel.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const studentRegister = async (req, res) => {
  const {
    studentId,firstName,lastName, email,grade,familyFirstName,familyLastName,familyContact, password,region,kebele,
  } = req.body;

  // Validate required fields
  if (!studentId || !firstName || !lastName || !email || !grade || !familyContact || !region || !kebele) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields (studentId, firstName, lastName, email, grade, familyContact, region, kebele).',
    });
  }

  try {
    // Check if the email or studentId already exists
    const existingStudent = await Student.findOne({ 
      where: { 
        [Op.or]: [{ email }, { studentId }] // Check both email and studentId
      } 
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'Email or Student ID already exists. Please choose a different one.',
      });
    }

    // Generate a random password for the student
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student record in the database
    const newStudent = await Student.create({
      studentId, // Use the provided studentId
      firstName,
      lastName,
      email,
      grade,
      familyFirstName,
      familyLastName,
      familyContact,
      region,
      kebele, 
      password: hashedPassword,
    });

    const { password: studentPassword, ...student } = newStudent.toJSON(); // Exclude password from the response
    res.status(201).json({
      success: true,
      message: 'Student registered successfully!',
      student: student,
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering student. Please try again later.',
    });
  }
};

export default studentRegister ;
