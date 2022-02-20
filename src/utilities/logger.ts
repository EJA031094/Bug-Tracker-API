import { format, transports, createLogger } from 'winston';

const { printf, combine, timestamp, colorize, errors } = format;

const loggerFormat = printf(({ level, message, timestamp }) => {
    return `${ timestamp } - ${ level }: ${ message }`;
});

export const logger = createLogger({
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        loggerFormat
    ),
    transports: [
        new transports.Console()
    ]
});