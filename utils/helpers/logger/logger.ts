import winston from "winston";
import fs from "fs";
import path from "path";

// const logDirectory = "logs";
const logDirectory = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "cyan",
  verbose: "blue",
  debug: "magenta",
  silly: "gray",
};

winston.addColors(customColors);

const logger = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      let formattedMessage = `${timestamp} - `;
      if (level) {
        formattedMessage += `[${level.toUpperCase()}] `;
      }
      formattedMessage +=
        typeof message === "object"
          ? JSON.stringify(message, null, 2)
          : message;
      return formattedMessage;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "combined.log"),
      level: "silly",
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),
  ],
});

export default logger;