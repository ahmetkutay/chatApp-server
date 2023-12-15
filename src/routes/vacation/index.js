const express = require('express');
const verifyToken = require('../../middlewares/jwtMiddleware');
const router = express.Router();
const createVacation = require("./createVacation");

//router.use('/list', getUserList);
router.use("/create", verifyToken, createVacation);


module.exports = router;