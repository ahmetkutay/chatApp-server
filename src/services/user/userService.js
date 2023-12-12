const {getMongoDBConnection} = require('../../config/mongo.js');
const Logger = require('../../helpers/logger');
const User = require('../../models/users/usersModel');

class UserService {
    /**
     * UserService class handles user-related operations in a MongoDB database.
     * It provides methods for creating a new user, finding users by email, mobile number, or username,
     * listing users, and validating passwords.
     */
    constructor() {
        this.mongoDBConn = getMongoDBConnection();
        this.userCollection = this.userCollection !== undefined ? this.userCollection : this.mongoDBConn.collection('users');
    }

    /**
     * Creates a new user with the provided user data and saves it to the database.
     * @param {Object} userData - The user data object containing name, email, and password.
     * @returns {Promise} - A promise that resolves with the newly created user.
     * @throws {Error} - If there is an error creating the user.
     */
    static async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            Logger.error(`Error creating user: ${error}`);
            throw error;
        }
    }

    /**
     * Finds a user in the database based on the provided email.
     * @param {string} email - The email of the user to find.
     * @returns {Promise} - A promise that resolves with the found user.
     */
    async findByEmail(email) {
        return this.userCollection.findOne({email});
    }

    /**
     * Finds a user in the database based on the provided mobile number.
     * @param {string} mobileNumber - The mobile number of the user to find.
     * @returns {Promise} - A promise that resolves with the found user.
     */
    async findByMobileNumber(mobileNumber) {
        return this.userCollection.findOne({mobileNumber});
    }

    /**
     * Finds a user in the database based on the provided username.
     * @param {string} username - The username of the user to find.
     * @returns {Promise} - A promise that resolves with the found user.
     */
    async findByUsername(username) {
        return this.userCollection.findOne({username});
    }

    /**
     * Lists all users in the database.
     * @returns {Promise} - A promise that resolves with an array of users.
     * @throws {Error} - If there is an error listing the users.
     */
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

    /**
     * Validates a password by comparing it with a hashed password.
     * @param {string} password - The password to validate.
     * @param {string} hashedPassword - The hashed password to compare against.
     * @returns {Promise} - A promise that resolves with a boolean indicating if the password is valid.
     */
    async validatePassword(password, hashedPassword) {
        const user = new User();
        return await user.comparePassword(password, hashedPassword);
    }
}

module.exports = UserService;
