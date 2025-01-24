import jwt from 'jsonwebtoken'; // Import JWT library

// Middleware to authenticate requests
export default (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from authorization header
    if (!token) return res.status(401).json({ message: 'Unauthorized' }); // Handle missing token

    // Verify the token
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' }); // Handle invalid token
        req.user = decoded; // Attach user info to request
        next(); // Proceed to the next middleware
    });
};