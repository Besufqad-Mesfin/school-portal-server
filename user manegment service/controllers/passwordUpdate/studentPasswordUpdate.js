// controllers/studentPasswordUpdate.js
import Student from '../models/studentRegisterModel.js';
import bcrypt from 'bcryptjs';
export const updateStudentPassword = async (req, res) => {
    const { studentId, oldPassword, newPassword } = req.body;

    if (!studentId || !oldPassword || !newPassword) {
        return res.status(400).json({ success: false, message: 'Please provide studentId, oldPassword, and newPassword.' });
    }
    try {
        // Find the student by studentId
        const student = await Student.findOne({ where: { studentId } });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found.' });
        }
        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, student.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Old password is incorrect.' });
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update the password in the database
        student.password = hashedPassword;
        await student.save();
        res.status(200).json({ success: true, message: 'Password updated successfully!' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ success: false, message: 'Failed to update password. Please try again later.' });
    }
};
