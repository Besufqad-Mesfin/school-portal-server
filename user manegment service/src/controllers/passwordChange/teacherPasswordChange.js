import bcrypt from "bcryptjs";
import TeacherModel from "../../models/teacherModel.js"; // Adjust the path to your Teacher model

/**
 * Controller to handle password update requests for teachers.
 */
export async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword, teacherId } = req.body; // Include oldPassword in the request body

    // Step 1: Authenticate user
    const user = await TeacherModel.findOne({ where: { teacherId } }); // Fetch teacher from the TeacherModel
    if (!user) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Step 2: Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Step 3: Update password
    user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    await user.save();
    return res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
