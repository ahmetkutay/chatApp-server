const {getMongoDBConnection} = require('../../config/mongo.js');
const Logger = require('../../Helpers/Logger');

class UserService {

    async listUsers() {
        try {
            const mongoDBConn = await getMongoDBConnection();
            const userCollection = mongoDBConn.collection('users');
            const users = await userCollection.find({}).limit(5).toArray();
            Logger.info(`UserService -- listUsers was called and returning value: ${JSON.stringify(users)}`);
            return users;
        } catch (error) {
            Logger.error(`Error listing users: ${error}`);
            throw error;
        }
    }
}

module.exports = UserService;