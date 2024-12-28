import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets it in the response header.
 * 
 * @param {Object} user - The user object containing user data (e.g., teacherId, email, etc.)
 * @param {Object} res - The response object to set the token in the header.
 * @param {string} secret - The secret key for signing the token.
 * @param {string} expiresIn - The expiration time for the token (e.g., "1h").
 * 
 * @returns {string} The generated token.
 */
export const generateAndSetToken = (user, res, secret = process.env.JWT_SECRET, expiresIn = '1h') => {
  try {
    // Create a payload with user details (you can customize this as needed)
    const payload = {
      teacherId: user.teacherId,
      email: user.email, // You can add other fields as necessary
    };

    // Generate the JWT token
    const token = jwt.sign(payload, secret, { expiresIn });

    // Set the token in the response header (optional: as 'Authorization' or custom header)
    res.setHeader('Authorization', `Bearer ${token}`);

    // Optionally, you can send the token in the response body
    return token; // Return the token so you can use it as needed
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
};
