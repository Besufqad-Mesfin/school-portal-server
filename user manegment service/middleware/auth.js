import jwt from "jsonwebtoken";
import User from "../models/teacherModel.js"; // Adjust the path to your User model

/**
 * Middleware to authenticate the user using a JSON Web Token (JWT).
 */
export async function authenticateUser(req, res, next) {
  try {
    // Step 1: Get the token from the request headers
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Step 2: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Step 3: Find the user associated with the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
}
