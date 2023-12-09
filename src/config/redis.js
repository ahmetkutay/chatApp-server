const redis = require('redis');
const util = require('util');
const config = require('./config');
const Logger = require('../helpers/logger');

let client;

function connectToRedis() {
    try {
        Logger.info('Connecting to Redis...');
        client = redis.createClient(config.database.redis);
        client.on('error', (error) => {
            Logger.error(`Error connecting to Redis: ${error}`);
        });
    } catch (error) {
        Logger.error(`Error connecting to Redis: ${error}`);
    }
}

function getRedisClient() {
    return {
        get: util.promisify(client.get).bind(client),
        set: util.promisify(client.set).bind(client),
        del: util.promisify(client.del).bind(client),
        // Add other commands as needed
    };
}

function closeRedis() {
    try {
        Logger.info('Redis connection is closing...');
        client.quit();
    } catch (error) {
        Logger.error(`Error closing Redis connection: ${error}`);
    }
}

module.exports = {connectToRedis, getRedisClient, closeRedis};