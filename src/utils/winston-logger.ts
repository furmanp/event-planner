import * as winston from 'winston';

const levels: winston.config.AbstractConfigSetLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = (): string => {
    const env: string = process.env.NODE_ENV || 'development';
    const isDevelopment: boolean = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const colors: winston.config.AbstractConfigSetColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.colorize({all: true}),
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
);

const transports: winston.transport[] = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({filename: 'logs/all.log'}),
];

export const logger: winston.Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
