const UserService = require("../services/user/userService");
const Logger = require("./logger");

async function checkExistingUserForLogin(userData) {
    /**
     * Checks if a user already exists for login by searching for their email, username, or mobile number in the database.
     *
     * @param {object} userData - An object containing the user's email, username, and mobile number.
     * @returns {object|undefined} - The user object if a user is found, otherwise undefined.
     */
    const userService = new UserService();
    const findUserEmail = await userService.findByEmail(userData);
    const findUsername = await userService.findByUsername(userData);
    const findUserMobileNumber = await userService.findByMobileNumber(userData);
    if (findUserEmail || findUsername || findUserMobileNumber) {

        if (findUserEmail) {
            Logger.info(`POST /api/auth/login logged by email and user - email: ${findUserEmail.email} !`);
            return findUserEmail;
        } else if (findUsername) {
            Logger.info(`POST /api/auth/login logged by username and user - username: ${findUsername.username}!`);
            return findUsername;
        } else if (findUserMobileNumber) {
            Logger.info(`POST /api/auth/login logged by mobileNumber and user - mobileNumber: ${findUserMobileNumber.mobileNumber}!`);
            return findUserMobileNumber;
        }

        return undefined;
    }
}

module.exports = checkExistingUserForLogin;