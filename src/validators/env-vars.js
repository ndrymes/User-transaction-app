const joi = require("joi");
require("dotenv").config();
// required environment variables
let validatedEnvVariables = {};
["NODE_ENV", "APP_NAME", "PORT"].forEach((name) => {
  if (!process.env[name])
    throw new Error(`Environment variable ${name} is missing`);
});
const envVarsSchema = joi
  .object({
    APP_NAME: joi.string().required(),
    NODE_ENV: joi.string().required(),
    PORT: joi.any().required(),
  })
  .unknown()
  .required();

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
validatedEnvVariables = envVariables;

const envVars = {
  env: validatedEnvVariables.NODE_ENV,
  port: validatedEnvVariables.PORT,
  app_name: validatedEnvVariables.APP_NAME,
};

module.exports = envVars;
