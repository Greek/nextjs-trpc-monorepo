import winston from 'winston';

const { errors, timestamp, json } = winston.format;
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'http',
  format: winston.format.combine(errors({ stack: true }), timestamp(), json()),
  transports: [new winston.transports.Console()],
});
