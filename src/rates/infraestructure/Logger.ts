import * as winston from 'winston';
import Environment from '../application/Environment';
const LOG_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

export default class Logger {
  private internalLogger: winston.Logger;

  constructor() {
    winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'cyan',
      debug: 'green',
    });

    const format = this.getFormat();

    const logConfiguration = {
      transports: [new winston.transports.Console()],
      format,
    };
    this.internalLogger = winston.createLogger(logConfiguration);
    this.internalLogger.level = LOG_LEVEL.DEBUG;
  }

  info(message: any, args?: any): void {
    this.log(LOG_LEVEL.INFO, message, args);
  }

  warn(message: any, args?: any): void {
    this.log(LOG_LEVEL.WARN, message, args);
  }
  error(message: any, args?: any): void {
    const params = args instanceof Error ? { error: args } : { ...args };
    this.log(LOG_LEVEL.ERROR, message, params);
  }
  debug(message: any, args?: any): void {
    this.log(LOG_LEVEL.DEBUG, message, args);
  }

  log(logLevel: string, message: any, args?: any): void {
    this.internalLogger.log(logLevel, { message, ...args });
  }
  private getFormat(): winston.Logform.Format {
    if (Environment.isLocal()) {
      return winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((log) => {
          return `${log.timestamp}| [${log.level.toUpperCase()}]: ${log.message} ${
            (log.message as unknown) instanceof Error ? (log.message as unknown as Error).stack : ''
          } | ${JSON.stringify(log.metadata ?? {})}`;
        }),
        winston.format.colorize({ all: true }),
      );
    }
  }
}
