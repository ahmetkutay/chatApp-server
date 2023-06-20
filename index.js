const express = require('express');
const helmet = require('helmet');
const Logger = require('./Helpers/Logger');

const app = express();

app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500).json({
            error: {
                message: err.message, stack: err.stack,
            },
        });
    });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet({
        contentSecurityPolicy: false,
    }));
}

app.get('/', (req, res) => {
    Logger.info(`GET /`);
    return res.status(200).json({success: true, users: []});
});

app.use((err, req, res) => {
    console.error(err.stack);

    const errorResponse = {
        message: 'Internal Server Error',
    };

    if (req.app.get('env') === 'development') {
        errorResponse.error = err.message;
    }

    res.status(500).json(errorResponse);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    Logger.info(`Server is running on port ${port}`);
});

module.exports = app;