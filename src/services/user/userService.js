const {getMongoDBConnection} = require('../../config/mongo.js');
const Logger = require('../../helpers/logger');
const User = require('../../models/users/usersModel');

class UserService {
    constructor() {
        this.mongoDBConn = getMongoDBConnection();
        this.userCollection = this.mongoDBConn.collection('users');
    }

    static async findByEmail(email) {
        return this.userCollection.findOne({email}).exec();
    }

    static async findByMobileNumber(mobileNumber) {
        return this.userCollection.findOne({mobileNumber}).exec();
    }

    static async findByUsername(username) {
        return this.userCollection.findOne({username}).exec();
    }

    async listUsers() {
        try {
            const users = await this.userCollection.find({}).limit(5).toArray();
            Logger.info(`UserService -- listUsers was called and returning value: ${JSON.stringify(users)}`);
            return users;
        } catch (error) {
            Logger.error(`Error listing users: ${error}`);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            Logger.error(`Error creating user: ${error}`);
            throw error;
        }
    }
}

module.exports = UserService;