const express = require('express');
const getLog = require('./get_log');

const router = express.Router();

router.use('/read', getLog);

module.exports = router;