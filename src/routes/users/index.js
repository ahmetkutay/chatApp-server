const express = require('express');
const getUserList = require('./getUserList');

const router = express.Router();

router.use('/list', getUserList);

module.exports = router;