import AdminModel from "../../models/adminModel.js";
import bcrypt from "bcryptjs";

/**
 * Controller to handle password update requests for admins.
 */
export async function changePassword(req, res) {

  try {
    const { oldPassword, newPassword, email } = req.body; // Only newPassword is required since validation is done on the frontend.

    // Step 1: Authenticate user
    const user = await AdminModel.findOne({where:{email}}); // Fetch admin from the AdminModel
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password); // Compare the current password with the hashed password
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
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