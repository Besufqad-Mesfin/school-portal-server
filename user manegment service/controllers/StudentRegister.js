import { Op } from 'sequelize'; // Include this line
import Student from '../models/studentModels.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const studentRegister = async (req, res) => {
  const {
    studentId,
    firstName,
    lastName,
    email,
    grade,
    familyFirstName,
    familyLastName,
    familyContact,
    password,
    region,
    kebele,
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

    const generatedPassword = password || crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

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
        familyFirstName: newStudent.familyFirstName,
        familyLastName: newStudent.familyLastName,
        familyContact: newStudent.familyContact,
        region: newStudent.region,
        kebele: newStudent.kebele, 
      },
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