const express = require('express');
const fs = require('fs');
const path = require('path');
const Logger = require('../../Helpers/Logger');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const currentDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const filePath = path.join(__dirname, `../../../logs/app-${currentDate}.log`);
        const log = fs.readFileSync(filePath, 'utf8');

        Logger.info('GET /api/log - SUCCESS');

        res.status(200).json({log: log});
    } catch (error) {
        Logger.error(`GET /api/log - ERROR: ${error}`);

        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;
