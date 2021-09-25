const restify = require('restify');
const plugins = require('restify-plugins');
const { envVars } = require('./config');
const logger = require('./helpers/logger');
const authRoute = require('./routes/index');

const server = restify.createServer({
  name: envVars.app_name,
  versions: ['1.0.0'],
  port: envVars.port,
});

// set API versioning and allow trailing slashes
server.pre(restify.pre.sanitizePath());

// set request handling and parsing
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

// setup Routing and Error Event Handling
authRoute.setup(server);

// setup Routing and Error Event Handling

server.listen(envVars.port, () => {
  console.log(`${envVars.app_name} listening at ${envVars.port}`);
  logger.info(`${envVars.app_name} listening at ${envVars.port}`);
});
