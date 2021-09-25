const { errorResponseHelper, handleSucess } = require('../helpers/http-response');
const { validators } = require('../validators/account');
const { bankServices } = require('../services');

exports.getAccountBalance = (req, res) => {
  bankServices.getAccountBalance(req.params.accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return handleSucess(res, data);
  });
};

const creditUserAccount = (res, accountId, amount) => {
  // get current acoount balance
  let accountBalance = bankServices.getAccountBalance(accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return data;
  });
  accountBalance += amount;
  // Update users account
  const account = bankServices.updateAccount({ accountId, accountBalance },
    (error, data) => {
      if (error) {
        return errorResponseHelper(res, error);
      }
      return handleSucess(res, data);
    });
  //   saveTransaction({ ...account, amount, type: 'credit' });

  return { ...account };
};

const debitUserAccount = (res, accountId, amount) => {
  // get current account balance
  let accountBalance = bankServices.getAccountBalance(accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return data;
  });
  // check if the account balance is less than the amount to withdraw
  if (accountBalance < amount) {
    return errorResponseHelper(res, 'insufficent balance');
  }
  accountBalance -= amount;

  // Update users account
  const account = bankServices.updateAccount({ accountId, accountBalance },
    (error, data) => {
      if (error) {
        return errorResponseHelper(res, error);
      }
      return handleSucess(res, data);
    });
    //   saveTransaction({ ...account, amount, type: 'credit' });

  return { ...account };
};

exports.initiateTransaction = (req, res) => {
  const { error, value } = validators.initiateTransaction(req.body);
  if (error) {
    return errorResponseHelper(res, error);
  }
  req.body = value;
  const { type, amount } = req.body;
  const { accountId } = req.params;
  if (Number.isNaN(amount)) {
    return errorResponseHelper(res, 'invalid input');
  }
  if (type === 'credit') return creditUserAccount(res, accountId, amount);
  return debitUserAccount(res, accountId, amount);
};
