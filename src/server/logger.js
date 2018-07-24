import split from 'split';
import winston from 'winston';


const timestamp = () => new Date().toISOString();


const transports = [
    new (winston.transports.Console)({
        level: 'debug',
        handleExceptions: true,
    }),
];


const format = winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
);


const logger = winston.createLogger({
    format,
    transports,
    exitOnError: false,
});


// Hook for morgan
logger.stream = split().on('data', message => logger.info(message));


export default logger;
