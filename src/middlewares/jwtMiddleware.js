const JWT = require('../helpers/jwtHelper');
const Logger = require('../helpers/logger');

/**
 * Verifies the access token provided in the request header.
 * If the token is missing or invalid, it returns an error response.
 *
 * @param {Object} req - The request object containing the headers.
 * @param {Object} res - The response object used to send the error response.
 * @param {Function} next - The next middleware function to be called.
 * @returns {Object} - If the token is missing, returns a 401 error response with the message "Access token not found".
 *                     If the token is invalid, returns a 401 error response with the message "Invalid token".
 *                     If the token is valid, sets the `user` property of the request object and calls the next middleware function.
 */
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
