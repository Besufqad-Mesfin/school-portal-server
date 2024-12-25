import AdminModel from '../../models/adminModel.js';
import bcrypt from 'bcryptjs';

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminModel.findOne({ where: { email } });

        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid Email' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid Password' });
        }

        res.status(200).json({ success: true, message: `Welcome ${admin.email}!` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}