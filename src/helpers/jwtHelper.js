const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Logger = require('./logger');

class JWT {
    /**
     * JWT class responsible for generating and verifying JSON Web Tokens (JWTs) using a secret key.
     */
    constructor() {
        this.secretKey = config.jwtSecrets.jwtSecret;
        this.accessTokenExpiresIn = config.jwtSecrets.accessTokenExpiration;
        this.refreshTokenExpiresIn = config.jwtSecrets.refreshTokenExpiration;
    }

    /**
     * Generates an access token using the provided payload and the secret key.
     * The token will expire after the specified access token expiration time.
     * @param {object} payload - The payload to be included in the access token.
     * @returns {string} - The generated access token.
     */
    generateAccessToken(payload) {
        return jwt.sign(payload, this.secretKey, {expiresIn: this.accessTokenExpiresIn});
    }

    /**
     * Generates a refresh token using the provided payload and the secret key.
     * The token will expire after the specified refresh token expiration time.
     * @param {object} payload - The payload to be included in the refresh token.
     * @returns {string} - The generated refresh token.
     */
    generateRefreshToken(payload) {
        return jwt.sign(payload, this.secretKey, {expiresIn: this.refreshTokenExpiresIn});
    }

    /**
     * Verifies the authenticity of a token by using the secret key.
     * If the token is valid, it returns the decoded payload.
     * If the token is invalid or expired, it returns null.
     * @param {string} token - The token to be verified.
     * @returns {object|null} - The decoded payload if the token is valid, otherwise null.
     */
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
