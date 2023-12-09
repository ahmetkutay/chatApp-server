const mysql = require('mysql2/promise');
const config = require('./config');
const Logger = require('../helpers/logger');

let connection;

async function connectToMySQL() {
    try {
        Logger.info('Connecting to MySQL...');
        connection = await mysql.createConnection(config.database.mysql);
    } catch (error) {
        Logger.error(`Error connecting to MySQL: ${error}`);
    }
}

function getMySQLConnection() {
    return connection;
}

async function closeMySQL() {
    try {
        Logger.info('MySQL connection is closing...');
        await connection.end();
    } catch (error) {
        Logger.error(`Error closing MySQL connection: ${error}`);
    }
}

module.exports = {connectToMySQL, getMySQLConnection, closeMySQL};