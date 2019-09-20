const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    // get the token from the req header
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // refer to https://jwt.io
        req.user = decoded.user;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
};
