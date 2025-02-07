import AdminModel from "../../models/adminModel.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const staffRegister = async (req, res) => {
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

    // Check validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !sex ||
      !role ||
      !educationLevel
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await AdminModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const generatedPassword = password || crypto.randomBytes(8).toString('hex');
        // Hash the password
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        // Create a new user
        const newUser = new AdminModel({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          phoneNumber,
          sex,
          role,
          educationLevel,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'Staff registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering staff' });
    }
};

export default staffRegister;
