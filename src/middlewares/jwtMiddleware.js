const JWT = require('../helpers/jwtHelper');
const Logger = require('../helpers/logger');

function verifyToken(req, res, next) {
    const token = req.headers.authorization; // Get the token from the request header
    const jwtHelper = new JWT();
    if (!token) {

        return res.status(401).json({message: 'Access token not found'});
    }

    try {
        req.user = jwtHelper.verifyToken(token);
        next();
    } catch (error) {
        Logger.error(`Error verifying token when inside the middleware: ${error}`);
        return res.status(401).json({message: 'Invalid token'});
    }
}

module.exports = verifyToken;
