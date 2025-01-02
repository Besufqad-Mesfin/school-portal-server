import teacherModel from "../../models/teacherModel.js";

export const teacherLogout = async (req, res) => {
  try {
    const { teacherId } = req.body;

    // Find the teacher in the database to verify if they exist
    const teacher = await teacherModel.findOne({ where: { teacherId } });
 // Clear the token from cookies
    res.clearCookie("token"); // Assuming the token is stored in a cookie named "token"

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
