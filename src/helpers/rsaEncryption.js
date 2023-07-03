const crypto = require('crypto');
const config = require('../config/config');

const encryptedPrivateKey = config.encryptionSecrets.rsaEncryptionSecret.privateKey;
const publicKey = config.encryptionSecrets.rsaEncryptionSecret.publicKey;
const passphrase = config.encryptionSecrets.rsaEncryptionSecret.passphrase;

function decryptPrivateKey(encryptedKey, passphrase) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', passphrase, Buffer.alloc(16));
    let decryptedKey = decipher.update(encryptedKey, 'base64', 'utf8');
    decryptedKey += decipher.final('utf8');
    return decryptedKey;
}

const privateKey = decryptPrivateKey(encryptedPrivateKey, passphrase);

function encryptDataRSA(data) {
    const encryptedBuffer = crypto.publicEncrypt(publicKey, Buffer.from(data));
    return encryptedBuffer.toString('base64');
}

function decryptDataRSA(encryptedData) {
    const encryptedBuffer = Buffer.from(encryptedData, 'base64');
    const decryptedBuffer = crypto.privateDecrypt(privateKey, encryptedBuffer);
    return decryptedBuffer.toString('utf8');
}

module.exports = {encryptDataRSA, decryptDataRSA};
