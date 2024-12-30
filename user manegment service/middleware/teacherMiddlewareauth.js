import jwt from "jsonwebtoken";
import teacherModel from "../models/UserTeacher.js";
import bcrypt from "bcrypt";

const authMiddleware = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Find teacher by email
      const teacher = await teacherModel.findOne({ where: { email } });

      if (!teacher) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare password using bcrypt
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: teacher.teacherId },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );

      // Update teacher's login status
      teacher.isLoggedIn = true;
      await teacher.save();

      res.json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const teacherId = req.user?.id; // Assuming the user ID is extracted from middleware

      if (!teacherId) {
        return res.status(400).json({ message: "User not logged in" });
      }

      const teacher = await teacherModel.findByPk(teacherId);

      if (!teacher || !teacher.isLoggedIn) {
        return res.status(400).json({ message: "User not logged in" });
      }

      // Update login status
      teacher.isLoggedIn = false;
      await teacher.save();

      res.json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  },
};

export default authMiddleware;
