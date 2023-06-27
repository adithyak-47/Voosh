//Middleware that authenticates the user based on the token in the authorization header.

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({error: "Unauthorized"});
    try
    {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch(err)
    {
        res.status(401).json({error: err});
    }
}

module.exports = authenticate;
