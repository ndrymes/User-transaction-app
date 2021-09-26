const HTTPStatus = require("../constants/http-status");
const logger = require("./logger");

const responseHandler = (code, message, res, error, data) => {
  res.status(code);
  return res.send({
    error,
    code,
    message,
    data,
  });
};

exports.handleError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

exports.handleErrorResponse = (res, err) => {
  if (err.name === "ValidationError") {
    const message = "VALIDATION_ERROR";
    const response = responseHandler(
      HTTPStatus.BadRequest,
      message,
      res,
      true,
      []
    );
    return response;
  }
  logger.error("Error from processing account", err);
  const response = responseHandler(
    HTTPStatus.INTERNAL_SERVER_ERROR,
    err,
    res,
    true,
    []
  );
  return response;
};

exports.handleSucessResponse = (res, data) => {
  logger.info("account data gotten successfully");
  const response = responseHandler(
    HTTPStatus.OK,
    "Data gotten successfully",
    res,
    false,
    data
  );
  return response;
};
