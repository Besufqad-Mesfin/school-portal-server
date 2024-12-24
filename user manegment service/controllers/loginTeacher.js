import UserTeacher from '../models/UserTeacher.js';

export const loginT = async (req, res) => {
  const { firstName, password } = req.body;

  try {
    const user = await UserTeacher.findOne({ where: { firstName, password } });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    res.status(200).json({ success: true, message: `Welcome ${user.role}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export default loginT;