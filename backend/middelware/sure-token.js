const JWT = require('jsonwebtoken');

const makeSure = async (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            return res.status(401).json({ msg: 'No token provided' });
        }

        const token = header.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: 'Invalid token format' });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'token expired' });
        }
        return res.status(403).json({ message: 'invalid token' });
    }
};

module.exports = makeSure;
