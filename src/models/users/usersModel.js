const {getMongoDBConnection} = require('../../config/mongo');
const Logger = require('../../helpers/logger');
const bcrypt = require('bcrypt');

const currentDate = new Date().toLocaleString('en-US', {timeZone: 'UTC'});

class User {
    constructor(data) {
        this.collection = getMongoDBConnection().collection('users');
        this.data = data;
    }

    static generateHash(password) {
        return bcrypt.hash(password, 12);
    }

    static async comparePassword(candidatePassword, hashedPassword) {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }

    validate() {
        if (
            !this.data.username ||
            !this.data.firstName ||
            !this.data.lastName ||
            !this.data.email ||
            !this.data.password ||
            !this.data.mobileNumber
        ) {
            throw new Error('Required fields are missing');
        }
    }

    async save() {
        this.validate();

        if (this.data.password) {
            this.data.password = await User.generateHash(this.data.password);
        }
        //this.completeRegistrationData();

        try {
            console.log('this.data: ', this.data);
            await this.collection.insertOne(this.data);
            Logger.info('User saved successfully.');
            return this.data;
        } catch (error) {
            Logger.error(`Error saving user: ${error}`);
            throw new Error('Error saving user');
        }
    }

    completeRegistrationData() {
        if (!this.data.verified) {
            this.data.verified = false;
        }

        if (!this.data.activeStatus) {
            this.data.activeStatus = 'active';
        }

        if (!this.data.oauthProfiles) {
            this.data.oauthProfiles = [];
        }

        if (!this.data.acceptTerms) {
            this.data.acceptTerms = 'not_accepted';
        }

        if (!this.data.verificationToken) {
            this.data.verificationToken = '';
        }

        this.data.createdAt = currentDate;
        this.data.lastUpdatedAt = currentDate;
    }

}

module.exports = User;