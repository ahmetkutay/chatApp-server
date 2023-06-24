const {MongoClient} = require('mongodb');
const config = require('./config');
const Logger = require('../helpers/logger');
const {createUserCollection} = require('./mongoSchemas/userSchemaValidation');

const {database: {dsn, db}} = config;

let mongoClient;
let mongoDB;

async function connectToMongoDB() {
    mongoClient = new MongoClient(dsn);
    try {
        Logger.info('Connecting to MongoDB...');
        await mongoClient.connect();
        mongoDB = mongoClient.db(db);
        await createCollectionIfNotExists('users');
    } catch (error) {
        Logger.error(`Error connecting to MongoDB: ${error}`);
    }
}

async function createCollectionIfNotExists(collectionName) {
    try {
        const collectionNames = await mongoDB.listCollections().toArray();
        const collectionExists = collectionNames.some((collection) => collection.name === collectionName);

        if (!collectionExists) {
            await createUserCollection(mongoDB);
            Logger.info(`Collection '${collectionName}' created.`);
        } else {
            Logger.info(`Collection '${collectionName}' already exists.`);
        }
    } catch (error) {
        Logger.error(`Error creating/checking collection '${collectionName}': ${error}`);
    }
}

function getMongoDBConnection() {
    return mongoDB;
}

async function closeMongoDB() {
    try {
        Logger.info('MongoDB connection is closing...');
        await mongoClient.close();
    } catch (error) {
        Logger.error(`Error closing MongoDB connection: ${error}`);
    }
}

module.exports = {connectToMongoDB, getMongoDBConnection, closeMongoDB};
