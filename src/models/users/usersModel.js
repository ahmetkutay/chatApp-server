const { getMongoDBConnection } = require("../../config/mongo");
const Logger = require("../../helpers/logger");
const bcrypt = require("bcrypt");

/**
 * Represents a User.
 * @constructor
 * @param {Object} data - The user data.
 * @param {string} data.username - The username.
 * @param {string} data.firstName - The first name.
 * @param {string} data.lastName - The last name.
 * @param {string} data.email - The email address.
 * @param {string} data.password - The password.
 * @param {string} data.mobileNumber - The mobile number.
 */
class User {
  constructor(data) {
    this.collection = getMongoDBConnection().collection("users");
    this.data = data;
  }

  /**
   * Generates a hash for the given password using bcrypt with a cost factor of 12.
   * @static
   * @param {string} password - The password to hash.
   * @returns {string} The generated hash.
   */
  static generateHash(password) {
    return bcrypt.hash(password, 12);
  }

  /**
   * Compares the candidate password with the hashed password using bcrypt.
   * @async
   * @param {string} candidatePassword - The candidate password.
   * @param {string} hashedPassword - The hashed password.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
   */
  async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  /**
   * Validates the user data to ensure all required fields are present.
   * @throws {Error} If any required field is missing.
   */
  validate() {
    if (
      !this.data.username ||
      !this.data.firstName ||
      !this.data.lastName ||
      !this.data.email ||
      !this.data.password ||
      !this.data.mobileNumber
    ) {
      throw new Error("Required fields are missing");
    }
  }

  /**
   * Saves the user data to the MongoDB collection.
   * @async
   * @returns {Promise<Object>} A promise that resolves to the saved user data.
   * @throws {Error} If there is an error saving the user.
   */
  async save() {
    this.validate();

    if (this.data.password) {
      this.data.password = await User.generateHash(this.data.password);
    }
    await this.completeRegistrationData();

    try {
      await this.collection.insertOne(this.data).catch((err) => {
        Logger.error("Got error while creating user: ", err);
      });
      Logger.info("User saved successfully.");
      return this.data;
    } catch (error) {
      Logger.error(`Error saving user: ${error}`);
      throw new Error("Error saving user");
    }
  }

  /**
   * Sets default values for various fields in the user data.
   */
  completeRegistrationData() {
    this.data.verified = false;
    this.data.activeStatus = false;
    this.data.oauthProfiles = [];
    this.data.acceptTerms = false;
    this.data.verificationToken = "";
    this.data.createdAt = new Date();
    this.data.lastUpdatedAt = new Date();
    this.data.lastLoginAt = new Date();
  }
}

module.exports = User;
