const { MongoClient } = require("mongodb");
const config = require("./config");
const Logger = require("../helpers/logger");

let mongoClient;
let mongoDB;

async function connectToMongoDB() {
  const { dsn, db, username, password } = config.database.mongodb;
  const authMechanism = "DEFAULT";
  const authSource = "admin"; // or your auth database
  const mongoUrl = `${dsn}/${db}?authSource=${authSource}&authMechanism=${authMechanism}`;

  mongoClient = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      username: username,
      password: password,
    },
  });

  try {
    Logger.info("Connecting to MongoDB...");
    await mongoClient.connect();
    mongoDB = mongoClient.db(db);
  } catch (error) {
    Logger.error(`Error connecting to MongoDB: ${error}`);
  }
}

function getMongoDBConnection() {
  return mongoDB;
}

async function closeMongoDB() {
  try {
    Logger.info("MongoDB connection is closing...");
    await mongoClient.close();
  } catch (error) {
    Logger.error(`Error closing MongoDB connection: ${error}`);
  }
}

module.exports = { connectToMongoDB, getMongoDBConnection, closeMongoDB };
