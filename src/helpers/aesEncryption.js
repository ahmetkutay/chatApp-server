const crypto = require('crypto');
const config = require('../config/config');

const ENC = config.encryptionSecrets.aesEncryptionSecret.ENC;
const IV = config.encryptionSecrets.aesEncryptionSecret.IV;
const ALGO = 'aes-256-cbc';

const encryptDataAES = (text) => {
    let cipher = crypto.createCipheriv(ALGO, ENC, IV);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

const decryptDataAES = (text) => {
    let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
    let decrypted = decipher.update(text, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {encryptDataAES, decryptDataAES};
