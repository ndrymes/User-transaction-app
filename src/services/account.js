const AsyncLock = require('async-lock');

const lock = new AsyncLock();

const { handleError } = require('../helpers/http-response');
const { bankRepository } = require('../repositories');
/**
 * Retrieves the account balance
 * @param accountId uuid
 *
 * @returns accountBalance - object
 */

const getAccountDetails = (accountId, callback) => {
  try {
    if (lock.isBusy(accountId)) handleError('Service Unavailable', 503);
    const userAccount = bankRepository.getAccount(accountId);
    callback(null, userAccount);
  } catch (error) {
    callback(error);
  }
};

const getTransactionHistory = (accountId, callback) => {
  try {
    if (lock.isBusy(accountId)) handleError('Service Unavailable', 503);
    const transactionHistoryStore = bankRepository.getTransactionHostory();
    const transactionHistory = {
      transactionHistory:
       [...transactionHistoryStore.filter((transaction) => transaction.accountId === accountId)],
    };
    callback(null, transactionHistory);
  } catch (error) {
    callback(error);
  }
};
const getAccountBalance = (accountId, callback) => {
  try {
    if (lock.isBusy(accountId)) handleError('Service Unavailable', 503);
    const userAccount = bankRepository.getAccount(accountId);
    const accountBalance = userAccount.balance;
    return callback(null, accountBalance);
  } catch (error) {
    callback(error);
  }
};
/**
 * Persists the transaction history
 * @param transactionHistory object
 *
 */
const saveTransaction = (transactionHistory) => {
  bankRepository.saveTransactionHostory(transactionHistory);
};
const updateAccount = (data, callback) => {
  const { accountId, accountBalance } = data;
  lock.acquire(accountId, () => {
    const updatedAccount = bankRepository.updateAccount(accountId, accountBalance);
    callback(null, updatedAccount);
  }).catch((error) => {
    callback(error);
  });
};

exports.accountServices = {
  getAccountBalance,
  getAccountDetails,
  updateAccount,
  getTransactionHistory,
  saveTransaction,
};
