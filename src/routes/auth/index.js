const express = require('express');
//const getUserList = require('./get_user_list');
const registerUser = require('./registiration');

const router = express.Router();

//router.use('/list', getUserList);
router.use('/register', registerUser);

module.exports = router;