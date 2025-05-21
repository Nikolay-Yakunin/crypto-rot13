const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `[${level}] ${timestamp} — ${message}`;
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        colorize(),
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console()
    ],
});

module.exports = logger;