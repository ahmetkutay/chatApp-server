const winston = require('winston');
const { createLogger, format, transports } = winston;
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');

// Check if the log directory exists, create it if it doesn't
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const getCurrentLogFileName = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString().replace(/\//g, '-');
  return `app-${formattedDate}.log`;
};

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: path.join(logDirectory, getCurrentLogFileName()) })
  ]
});

let currentDate = new Date().toLocaleDateString();
let currentLogFile = path.join(logDirectory, getCurrentLogFileName());

const checkAndCreateNewLogFile = () => {
  const now = new Date().toLocaleDateString();
  if (now !== currentDate) {
    const logFileName = getCurrentLogFileName();
    currentLogFile = path.join(logDirectory, logFileName);

    logger.clear();
    logger.add(new transports.File({ filename: currentLogFile }));

    currentDate = now;
  }
};

const logToFiles = (level, message) => {
  checkAndCreateNewLogFile();
  logger.log({ level, message });
};

logger.info = (message) => logToFiles('info', message);
logger.warn = (message) => logToFiles('warn', message);
logger.error = (message) => logToFiles('error', message);

module.exports = logger;
