import split from 'split';
import winston from 'winston';


const timestamp = () => new Date().toISOString();


const transports = [
    new (winston.transports.Console)({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        prettyPrint: true,
        // label: name,
        timestamp,
    }),
];


const logger = new (winston.Logger)({
    transports,
    exitOnError: false,
});


// Hook for morgan
logger.stream = split().on('data', message => logger.info(message));


export default logger;