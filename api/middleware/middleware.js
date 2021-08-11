require('dotenv').config();
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SERCET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(token) {
        try {
            const decoded = jwt.verify(token, ACCESS_TOKEN);
            req.username = decoded.username;
        } catch(error) {
            return res.status(400).send('Token is invalid!');
        }
        return next();
    } else {
        return res.status(400).send('Please login!')
    }
}

module.exports = verifyToken;