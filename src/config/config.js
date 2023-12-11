require("dotenv").config();

module.exports = {
  database: {
    mongodb: {
      dsn: 'mongodb://'+ process.env.MONGO_HOST + ":" + process.env.MONGO_PORT,
      db: process.env.MONGO_INITDB_DATABASE,
      username: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    },
    mysql: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      db: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    redis: {
      password: process.env.REDIS_PASSWORD,
    },
  },
  jwtSecrets: {
    jwtSecret: process.env.JWTSECRET,
    accessTokenExpiration: process.env.ACCESSTOKENEXPIRATION,
    refreshTokenExpiration: process.env.REFRESHTOKENEXPIRATION,
  },

  encryptionSecrets: {
    aesEncryptionSecret: { ENC: process.env.ENC, IV: process.env.IV },
    rsaEncryptionSecret: {
      privateKey: process.env.RSA_PRIVATE_KEY,
      publicKey: process.env.RSA_PUBLIC_KEY,
      passphrase: process.env.RSA_PRIVATE_KEY_PASSPHRASE,
    },
  },
};
