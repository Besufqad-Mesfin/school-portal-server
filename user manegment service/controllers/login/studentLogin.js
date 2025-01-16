import studentModel from "../../models/studentModels.js"; // Ensure the path and extension are correct
import bcrypt from 'bcryptjs'; 

const studentLogin = async (req, res) => {
    const { studentId, password } = req.body;
    try {
        const student = await studentModel.findOne({ where: { studentId } }); // Match the model field name
        
        if (!student) {
            return res.status(400).json({ success: false, message: 'Invalid Username' });
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid Password' });
        }

        res.status(200).json({ success: true, message: `Welcome ${student.userName}!` }); // Updated to use userName
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { studentLogin }; // Correct export