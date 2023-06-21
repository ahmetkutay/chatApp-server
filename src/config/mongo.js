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
        Logger.info('Connected to MongoDB successfully');
    } catch (error) {
        Logger.error(`Error connecting to MongoDB: ${error}`);
    }
}

function getMongoDBConnection() {
    return mongoDB;
}

async function closeMongoDB() {
    try {
        await mongoClient.close();
        Logger.info('MongoDB connection closed');
    } catch (error) {
        Logger.error(`Error closing MongoDB connection: ${error}`);
    }
}

module.exports = {connectToMongoDB, getMongoDBConnection, closeMongoDB};
