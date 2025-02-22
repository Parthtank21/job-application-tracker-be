import { createLogger, format, transports } from "winston";

const { combine, timestamp, json, colorize, errors, printf } = format;

// Custom format for console logging with colors
const consoleLogFormat = combine(
  colorize(),
  printf(({ level, message, timestamp, stack }) => {
    return `[${level}] ${stack || message}`;
  })
);

const logger = createLogger({
  level: "http",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    // new transports.File({ filename: "logs/app.log" }),
  ],
});

export default logger;
