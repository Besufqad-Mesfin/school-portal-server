import UserTeacher from '../../models/teacherModel.js';
import bcrypt from "bcryptjs"; // Import bcrypt

export const loginTeacher = async (req, res) => {
  const { teacherId, password } = req.body;

  try {
    const user = await UserTeacher.findOne({ where: { teacherId } });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }
    
    res.status(200).json({ success: true, message: 'Login successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export default loginTeacher;