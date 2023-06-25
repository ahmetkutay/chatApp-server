require('dotenv').config();

module.exports = {
    database: {
        dsn: process.env.NODE_ENV !== 'development' ? process.env.DATABASE_CONNECTION_PROD : process.env.DATABASE_CONNECTION_DEVELOPMENT,
        db: process.env.NODE_ENV !== 'development' ? process.env.DATABASE_NAME_PROD : process.env.DATABASE_NAME_DEVELOPMENT,
    },
    jwtSecrets: {
        jwtSecret: process.env.JWTSECRET,
        accessTokenExpiration: process.env.ACCESSTOKENEXPIRATION,
        refreshTokenExpiration: process.env.REFRESHTOKENEXPIRATION
    },
    encryptionSecrets: {
        aesEncryptionSecret: {ENC: process.env.ENC, IV: process.env.IV},
        rsaEncryptionSecret: {
            privateKey: process.env.RSA_PRIVATE_KEY,
            publicKey: process.env.RSA_PUBLIC_KEY,
            passphrase: process.env.RSA_PRIVATE_KEY_PASSPHRASE
        },
    }
};