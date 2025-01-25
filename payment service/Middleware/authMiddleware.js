// Example of an authentication middleware to protect payment routes
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Get the token from the request headers

    if (!token) {
        return res.status(403).json({ message: 'No token provided' }); // If no token, reject the request
    }

    try {
        // Logic for verifying token (e.g., using JWT)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' }); // If token is invalid, reject the request
    }
};

export default authMiddleware; // Export the middleware for use in routes
