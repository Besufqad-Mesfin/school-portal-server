import AdminModel from '../../models/adminModel.js'; // Adjust the path if necessary
import bcrypt from 'bcryptjs'; // Assuming you want to hash the password

const registerAdmin = async (req, res) => {
  try {
    // Destructuring the fields from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      sex,
      role,
      educationLevel,
    } = req.body;

    // Check if admin with the same email already exists
    const existingAdmin = await AdminModel.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = await AdminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Storing hashed password
      phoneNumber,
      sex,
      role,
      educationLevel,
    });

    // Respond with success message and the new admin's details (excluding password)
    res.status(201).json({
      message: 'Admin registered successfully',
      admin: {
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
        phoneNumber: newAdmin.phoneNumber,
        sex: newAdmin.sex,
        role: newAdmin.role,
        educationLevel: newAdmin.educationLevel,
      },
    });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default registerAdmin;
