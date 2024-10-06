const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next);
{
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}

module.exports = authMiddleware;
