// setup Routing and Error Event Handling
const logger = require("./helpers/logger");
const { envVars } = require("./config");
const server = require("./app");
server.listen(envVars.port, () => {
  console.log(`${envVars.app_name} listening at ${envVars.port}`);
  logger.info(`${envVars.app_name} listening at ${envVars.port}`);
});
