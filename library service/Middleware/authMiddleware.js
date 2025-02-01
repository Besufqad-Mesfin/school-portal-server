const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.user = decoded; // Attach user info to request
        next();
    });
};