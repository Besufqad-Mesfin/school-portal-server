import bcrypt from "bcrypt";
import TeacherModel from "../../models/teacherModels.js"; // Adjust the path to your Teacher model
import { validatePassword } from "../../utils/validatePassword.js"; // Adjust the path to the utility function
import { generateAndSetToken } from "../../utils/generateAndSetToken.js"; // Adjust the path to your token generation utility

/**
 * Controller to handle password change requests for teachers.
 */
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Step 1: Authenticate user
    const user = await TeacherModel.findById(req.teacherId); // Fetch teacher user from the TeacherModel
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password); // Compare hashed passwords
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Step 3: Validate new password
    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.",
      });
    }

    // Step 4: Confirm passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Step 5: Update password
    user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    await user.save();

    // Step 6: Generate and set the new token (optional, you may want to update the token after a password change)
    generateAndSetToken(user, res); // This will set the token in the response header

    return res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
