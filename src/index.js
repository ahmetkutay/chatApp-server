const express = require('express');
const helmet = require('helmet');
const http = require('http');
const Logger = require('./helpers/logger');
const routes = require('./routes/routes.js');
const {connectToMongoDB} = require('./config/mongo');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(helmet());
app.use('/api', routes);

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
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
    Logger.info('GET /');
    return res.status(200).json({success: true, users: []});
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err.stack);

    const errorResponse = {
        message: 'Internal Server Error',
    };

    if (req.app.get('env') === 'development') {
        errorResponse.error = err.message;
    }

    res.status(500).json(errorResponse);
});

module.exports = app;

// Start the server
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'testing') {
    server.listen(port, async () => {
        Logger.info(`Server is running on port ${port}`);
        connectToMongoDB()
            .then(() => {
                Logger.info('After initial steps, MongoDB connection opened');
            })
            .catch((error) => {
                Logger.error(`Error opening MongoDB connection: ${error}`);
            });
    });
}
