const express = require('express');
const getLog = require('./getLog');

const router = express.Router();

router.use('/read', getLog);

module.exports = router;