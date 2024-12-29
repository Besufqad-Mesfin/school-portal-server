import bcrypt from "bcrypt";
import TeacherModel from "../../models/teacherModels.js"; // Adjust the path to your Teacher model

/**
 * Controller to handle password update requests for teachers.
 */
export async function changePassword(req, res) {
  try {
    const { newPassword } = req.body; // Only newPassword is required since validation is done on the frontend.

    // Step 1: Authenticate user
    const user = await TeacherModel.findById(req.teacherId); // Fetch teacher from the TeacherModel
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Step 2: Update password
    user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    await user.save();
    return res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });

  }
  
}