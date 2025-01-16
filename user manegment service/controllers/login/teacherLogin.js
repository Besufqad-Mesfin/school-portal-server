import UserTeacher from '../../models/teacherModel.js';
import bcrypt from "bcryptjs"; // Import bcrypt

export const loginTeacher = async (req, res) => {
  const { teacherId, password } = req.body;

  try {
    // Check if the user exists
    const user = await UserTeacher.findOne({ where: { teacherId } });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // Send success response without token
    res.status(200).json({
      success: true,
      message: 'Login successful',
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export default loginTeacher;
