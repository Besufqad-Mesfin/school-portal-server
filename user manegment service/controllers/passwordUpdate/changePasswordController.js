import bcrypt from "bcrypt";
import TeacherModel from "../../models/teacherModels.js"; // Adjust the path to your Teacher model

/**
 * Controller to handle password update requests for teachers.
 */
export async function changePassword(req, res) {
  try {
    const { newPassword, confirmPassword } = req.body;

    // Step 1: Authenticate user
    const user = await TeacherModel.findById(req.teacherId); // Fetch teacher from the TeacherModel
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Confirm passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
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
