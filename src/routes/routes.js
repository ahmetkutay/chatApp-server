const express = require('express');
const usersRoute = require('./Users/index.js');
const AuthRoute = require('./Auth/index.js');
const LogRoute = require('./Log/index.js');

const router = express.Router();

router.use("/users", usersRoute);
router.use("/auth", AuthRoute);
router.use("/log", LogRoute);

module.exports = router;
