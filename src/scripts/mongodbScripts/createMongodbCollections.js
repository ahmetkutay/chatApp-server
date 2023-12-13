const  { connectToMongoDB, getMongoDBConnection, closeMongoDB } = require('../../config/mongo.js');
const {createUserCollection} = require('../../config/mongoSchemas/userSchemaValidation.js');
const {createResetPasswordCollection} = require('../../config/mongoSchemas/resetPasswordSchemeValidation.js');
const Logger = require('../../helpers/logger.js');

Logger.info('Creating MongoDB collections...');
connectToMongoDB();


try {
    Logger.info('Collection creation started...');
    const mongoDBConn = getMongoDBConnection();
    console.log(mongoDBConn)
    createUserCollection(mongoDBConn);
    createResetPasswordCollection(mongoDBConn);
    Logger.info('Collection creation finished...');
} catch (error) {
    Logger.error(`Error creating collections: ${error}`);
}

closeMongoDB();
