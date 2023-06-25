const {Router} = require('express');
const UserService = require('../../services/user/userService');
const Logger = require('../../helpers/logger');
const {ajvMiddleware, checkExistingUser} = require('../../middlewares/registerValidation');
const JWT = require('../../helpers/jwtHelper');

const router = Router();

router.post(
    '/',
    ajvMiddleware,
    checkExistingUser,
    async (req, res, next) => {
        const jwtHelper = new JWT();
        try {
            const userData = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                mobileNumber: req.body.mobileNumber,
            };

            const user = await UserService.createUser(userData);
            const accessTokenPayload = {userId: user._id, username: user.username};
            const accessToken = jwtHelper.generateAccessToken(accessTokenPayload);
            Logger.info(`POST /api/users - user: ${JSON.stringify(user._id)} accessToken: ${accessToken}`);
            const result = {
                user: user._id,
                accessToken
            };
            return res.status(200).json(result);
        } catch (err) {
            return next(err);
        }
    }
);

module.exports = router;
