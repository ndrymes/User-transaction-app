const {
  handleErrorResponse,
  handleSucessResponse,
} = require("../helpers/http-response");
const { validators } = require("../validators/account");
const { accountServices } = require("../services");
const { transactionType } = require("../constants/account");

exports.getAccountBalance = (req, res) => {
  const { accountId } = req.params;
  accountServices.getAccountBalance(accountId, (error, data) => {
    if (error) return handleErrorResponse(res, error);
    return handleSucessResponse(res, data);
  });
};

exports.getTransactionHistory = (req, res) => {
  const { accountId } = req.params;
  accountServices.getTransactionHistory(accountId, (error, data) => {
    if (error) return handleErrorResponse(res, error);
    return handleSucessResponse(res, data);
  });
};

const executeDebitAccount = (res, accountId, amount) => {
  // get current account balance
  accountServices.getAccountBalance(accountId, (error, accountBalance) => {
    if (error) return handleErrorResponse(res, error);
    // check if the account balance is less than the amount to withdraw
    if (accountBalance < amount)
      return handleErrorResponse(res, "insufficent balance");
    accountBalance -= amount;

    // Update users account
    accountServices.updateAccount(
      { accountId, accountBalance },
      (error, data) => {
        if (error) return handleErrorResponse(res, error);
        // save history of transactions
        accountServices.saveTransaction({
          ...data,
          amount,
          type: transactionType.debit,
        });
        return handleSucessResponse(res, data);
      }
    );
  });
};

const executeCreditAccount = (res, accountId, amount) => {
  // get current account balance
  accountServices.getAccountBalance(accountId, (error, accountBalance) => {
    if (error) return handleErrorResponse(res, error);
    accountBalance += amount;
    //Update users account
    accountServices.updateAccount(
      { accountId, accountBalance },
      (error, data) => {
        if (error) return handleErrorResponse(res, error);
        // save history of transactions
        accountServices.saveTransaction({
          ...data,
          amount,
          type: transactionType.credit,
        });
        return handleSucessResponse(res, data);
      }
    );
  });
};

exports.initiateTransaction = (req, res) => {
  const { type, amount } = req.body;
  const { accountId } = req.params;
  if (type === "credit") return executeCreditAccount(res, accountId, amount);
  return executeDebitAccount(res, accountId, amount);
};
