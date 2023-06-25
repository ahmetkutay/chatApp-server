const {getMongoDBConnection} = require('../../config/mongo.js');
const Logger = require('../../helpers/logger');
const User = require('../../models/users/usersModel');

class UserService {
    constructor() {
        this.mongoDBConn = getMongoDBConnection();
        this.userCollection = this.userCollection !== undefined ? this.userCollection : this.mongoDBConn.collection('users');
    }

    static async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            Logger.error(`Error creating user: ${error}`);
            throw error;
        }
    }

    async findByEmail(email) {
        return this.userCollection.findOne({email});
    }

    async findByMobileNumber(mobileNumber) {
        return this.userCollection.findOne({mobileNumber});
    }

    async findByUsername(username) {
        return this.userCollection.findOne({username});
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

    async validatePassword(password, hashedPassword) {
        const user = new User();
        return await user.comparePassword(password, hashedPassword);
    }
}

module.exports = UserService;
