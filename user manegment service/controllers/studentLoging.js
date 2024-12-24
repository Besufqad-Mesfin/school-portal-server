import studentModel from "../models/studentModels.js"; // Ensure the path and extension are correct
import bcrypt from 'bcrypt'; // Don't forget to import bcrypt

const studentLogin = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const student = await studentModel.findOne({ where: { userName } }); // Match the model field name
        
        if (!student || !(await bcrypt.compare(password, student.password))) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        res.status(200).json({ success: true, message: `Welcome ${student.userName}!` }); // Updated to use userName
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { studentLogin }; // Correct export