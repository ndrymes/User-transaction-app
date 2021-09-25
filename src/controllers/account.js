const { errorResponseHelper, handleSucess } = require('../helpers/http-response');
const { validators } = require('../validators/account');
const { accountServices } = require('../services');
const { allowedValues } = require('../constants/account');

exports.getAccountBalance = (req, res) => {
  accountServices.getAccountBalance(req.params.accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return handleSucess(res, data);
  });
};

exports.getAccountBalance = (req, res) => {
  const { accountId } = req.params;
  accountServices.getAccountBalance(accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return handleSucess(res, data);
  });
};

const creditUserAccount = (res, accountId, amount) => {
  // get current account balance
  let accountBalance = accountServices.getAccountBalance(accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return data;
  });
  accountBalance += amount;
  // Update users account
  accountServices.updateAccount({ accountId, accountBalance },
    (error, data) => {
      if (error) {
        return errorResponseHelper(res, error);
      }
      // save history of transactions
      accountServices.saveTransaction({ ...data, amount, type: allowedValues.credit });
      return handleSucess(res, data);
    });
};

const debitUserAccount = (res, accountId, amount) => {
  // get current account balance
  let accountBalance = accountServices.getAccountBalance(accountId, (error, data) => {
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
  accountServices.updateAccount({ accountId, accountBalance },
    (error, data) => {
      if (error) {
        return errorResponseHelper(res, error);
      }
      // save history of transactions
      accountServices.saveTransaction({ ...data, amount, type: allowedValues.debit });
      return handleSucess(res, data);
    });
};

exports.getAccountBalance = (req, res) => {
  const { accountId } = req.params;
  accountServices.getAccountBalance(accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return handleSucess(res, data);
  });
};

exports.getTransactionHistory = (req, res) => {
  const { accountId } = req.params;
  accountServices.getTransactionHistory(accountId, (error, data) => {
    if (error) {
      return errorResponseHelper(res, error);
    }
    return handleSucess(res, data);
  });
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
