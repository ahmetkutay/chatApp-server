const express = require('express');
const Logger = require('../../helpers/logger');
const UserService = require('../../services/user/userService');

const router = express.Router();

router.get('/', async (req, res) => {
    const userService = new UserService();
    let listedUsers = await userService.listUsers();

    Logger.info(`GET /api/users/list - listedUsers: ${JSON.stringify(listedUsers)}`);

    res.status(200).json({listedUsers: listedUsers});
});


module.exports = router;
