const HTTPStatus = require('../constants/http-status');
const logger = require('./logger');

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

exports.errorResponseHelper = (res, err) => {
  // console.log({res});
  if (err.name === 'ValidationError') {
    const message = 'VALIDATION_ERROR';
    const resp = responseHandler(HTTPStatus.BadRequest, message, res, true, []);
    return resp.res_message();
  }
  logger.error('Error from processing account', err);
  const resp = responseHandler(
    HTTPStatus.INTERNAL_SERVER_ERROR,
    err,
    res,
    true,
    [],
  );
  return resp;
};

exports.handleSucess = (res, data) => {
  // console.log({res});
  logger.info('ride data gotten successfully');
  const response = responseHandler(
    HTTPStatus.OK,
    'Data gotten successfully',
    res,
    false,
    data,
  );
  return response;
};
