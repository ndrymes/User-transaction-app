const restify = require("restify");
const plugins = require("restify-plugins");
require("dotenv").config();
const { envVars } = require("./config");
const authRoute = require("./routes/index");

const server = restify.createServer({
  name: envVars.app_name,
  versions: ["1.0.0"],
  port: envVars.port,
});

// set API versioning and allow trailing slashes
server.pre(restify.pre.sanitizePath());

// set request handling and parsing
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());

// setup Routing and Error Event Handling
authRoute.setup(server);

module.exports = server;
