const express = require('express');
//const getUserList = require('./get_user_list');
const registerUser = require('./registiration');
const loginUser = require('./login');
const router = express.Router();

//router.use('/list', getUserList);
router.use('/register', registerUser);
router.use('/login', loginUser);


module.exports = router;