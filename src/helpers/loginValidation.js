const UserService = require("../services/user/userService");
const Logger = require("./logger");

async function checkExistingUserForLogin(userData) {
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