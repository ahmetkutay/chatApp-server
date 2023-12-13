const  { connectToMongoDB, getMongoDBConnection, closeMongoDB } = require('../../config/mongo.js');
const {createUserCollection} = require('../../config/mongoSchemas/userSchemaValidation.js');
const { createResetPasswordCollection } = require('../../config/mongoSchemas/resetPasswordSchemeValidation.js');
const Logger = require('../../helpers/logger.js');

(async () => {
    try {
        Logger.info('Creating MongoDB collections...');
        await connectToMongoDB();

        Logger.info('Collection creation started...');
        const mongoDBConn = await getMongoDBConnection();
        await createUserCollection(mongoDBConn);
        await createResetPasswordCollection(mongoDBConn);
        Logger.info('Collection creation finished...');
    } catch (error) {
        Logger.error(`Error creating collections: ${error}`);
    } finally {
        closeMongoDB();
    }
})();
