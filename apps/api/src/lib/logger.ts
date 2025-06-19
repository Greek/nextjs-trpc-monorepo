import httpContext from 'express-http-context';
import winston from 'winston';

const appendRequestId = winston.format.printf((info) => {
  if (httpContext.get('rid')) {
    info['requestId'] = httpContext.get('rid');
  }
  return JSON.stringify(info);
});

export class Logger {
  public logger: winston.Logger;
  private static instance: Logger;

  private constructor() {
    const { errors, timestamp, json } = winston.format;
    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'http',
      format: winston.format.combine(
        appendRequestId,
        errors({ stack: true }),
        timestamp(),
        json(),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance.logger;
  }
}
