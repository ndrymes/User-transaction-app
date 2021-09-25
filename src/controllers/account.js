const { errorResponseHelper, handleSucess } = require('../helpers/http-response');
const { bankServices } = require('../services');

exports.getAccountBalance = (req, res) => {
  bankServices.getAccountBalance(req.params.accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return handleSucess(res, data);
  });
};
