const {Router} = require('express');
const Logger = require('../../helpers/logger');
const JWT = require('../../helpers/jwtHelper');
const checkExistingUserForLogin = require('../../helpers/loginValidation');
const UserService = require('../../services/user/userService');

const router = Router();

router.post(
    '/',
    async (req, res, next) => {
        const jwtHelper = new JWT();
        const userService = new UserService();
        try {
            const userData = req.body.username !== undefined ? req.body.username : req.body.email !== undefined ? req.body.email : req.body.mobileNumber;
            const loggedUserData = await checkExistingUserForLogin(userData);
            const userPassword = req.body.password;
            if (loggedUserData === undefined) {
                return res.status(401).json({message: 'User not found!'});
            }
            const isPasswordValid = await userService.validatePassword(userPassword, loggedUserData.password);
            if (!isPasswordValid) {
                return res.status(401).json({error: 'Invalid password'});
            }
            const accessTokenPayload = {userId: loggedUserData._id, username: loggedUserData.username};
            const accessToken = jwtHelper.generateAccessToken(accessTokenPayload);
            Logger.info(`POST /api/auth/login - user: ${JSON.stringify(loggedUserData._id)} accessToken: ${accessToken}`);
            const result = {
                user: loggedUserData._id,
                accessToken
            };
            return res.status(200).json(result);
        } catch (err) {
            Logger.error(`Error logging in: ${err}`);
            return next(err);
        }
    }
);

module.exports = router;
