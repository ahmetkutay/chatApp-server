const express = require('express');
const usersRoute = require('./users/index.js');
const AuthRoute = require('./auth/index.js');
const LogRoute = require('./log/index.js');
const VacationRoute = require('./vacation/index.js');

const router = express.Router();

router.use("/users", usersRoute);
router.use("/auth", AuthRoute);
router.use("/log", LogRoute);
router.use("/vacation", VacationRoute);

module.exports = router;
