const winston = require('winston');
// es6 - rename destructured variable
const { serviceName: service } = require('../config/env-vars');

const transports = [
  //
  // - Write to all logs with level `info` and below to `combined.log`
  // - Write all logs error (and below) to `error.log`.
  //
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({ filename: 'combined.log' }),
];

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service },
  transports,
  exitOnError: false,
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
);

module.exports = logger;
