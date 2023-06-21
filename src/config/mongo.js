const {MongoClient} = require('mongodb');
const config = require('./config');
const Logger = require('../Helpers/Logger');

const {database: {dsn, db}} = config;

let mongoClient;
let mongoDB;

async function connectToMongoDB() {
    mongoClient = new MongoClient(dsn);
    try {
        Logger.info('Connecting to MongoDB...');
        await mongoClient.connect().then(() => mongoDB = mongoClient.db(db)).catch(error => Logger.error(`Error connecting to MongoDB: ${error}`));
    } catch (error) {
        Logger.error(`Error connecting to MongoDB: ${error}`);
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
