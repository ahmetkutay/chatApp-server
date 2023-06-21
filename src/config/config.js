require('dotenv').config();

module.exports = {
    database: {
        dsn: process.env.NODE_ENV !== 'development' ? process.env.DATABASE_CONNECTION_PROD : process.env.DATABASE_CONNECTION_DEVELOPMENT,
        db: process.env.NODE_ENV !== 'development' ? process.env.DATABASE_NAME_PROD : process.env.DATABASE_NAME_DEVELOPMENT,
    },
    JWTSECRET: process.env.JWTSECRET,
};