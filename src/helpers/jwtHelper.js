const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Logger = require('./logger');

class JWT {
    constructor() {
        this.secretKey = config.jwtSecrets.jwtSecret;
        this.accessTokenExpiresIn = config.jwtSecrets.accessTokenExpiration;
        this.refreshTokenExpiresIn = config.jwtSecrets.refreshTokenExpiration;
    }

    generateAccessToken(payload) {
        return jwt.sign(payload, this.secretKey, {expiresIn: this.accessTokenExpiresIn});
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, this.secretKey, {expiresIn: this.refreshTokenExpiresIn});
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (err) {
            Logger.error(`Error verifying token: ${err}`);
            return null;
        }
    }
}

module.exports = JWT;
