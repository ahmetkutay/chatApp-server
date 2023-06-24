const {Router} = require('express');
const UserService = require('../../services/user/userService');
const Logger = require('../../helpers/logger');
const ajvMiddleware = require('../../middlewares/registerValidation');

const router = Router();

router.post(
    '/',
    ajvMiddleware,
    async (req, res, next) => {
        try {
            const userService = new UserService();
            const existingEmail = await userService.findByEmail(req.body.email);
            if (existingEmail) {
                return res.status(400).send('The given email address already exists!');
            }

            const userData = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                mobileNumber: req.body.mobileNumber,
            };

            const user = await UserService.createUser(userData);

            Logger.info(`POST /api/users - user: ${JSON.stringify(user)}`);
            return res.status(200).json({user});
        } catch (err) {
            return next(err);
        }
    }
);

module.exports = router;
