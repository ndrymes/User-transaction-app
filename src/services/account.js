const AsyncLock = require("async-lock");

const lock = new AsyncLock();

const { handleError } = require("../helpers/http-response");
const { bankRepository } = require("../repositories");

/**
 * Retrieves the account details
 * @param accountId uuid
 *
 * @returns accountBalance - object
 */
const getAccountDetails = (accountId, callback) => {
  try {
    if (lock.isBusy(accountId)) handleError("Service Unavailable", 503);
    const userAccount = bankRepository.getAccount(accountId);
    callback(null, userAccount);
  } catch (error) {
    callback(error);
  }
};

/**
 * Retrieves the transaction history for an account
 * @param accountId
 *
 * @returns transactionHistory - List
 */
const getTransactionHistory = (accountId, callback) => {
  try {
    if (lock.isBusy(accountId)) handleError("Service Unavailable", 503);
    const transactionHistoryStore = bankRepository.getTransactionHistory();
    const transactionHistory = {
      transactionHistory: [
        ...transactionHistoryStore.filter(
          (transaction) => transaction.accountId === accountId
        ),
      ],
    };
    callback(null, transactionHistory);
  } catch (error) {
    callback(error);
  }
};

/**
 * Retrieves the account balance
 * @param accountId uuid
 *
 * @returns accountBalance - object
 */

const getAccountBalance = (accountId, callback) => {
  try {
    if (lock.isBusy(accountId)) handleError("Service Unavailable", 503);
    const userAccount = bankRepository.getAccount(accountId);
    const accountBalance = userAccount !== null ? userAccount.balance : null;
    callback(null,  accountBalance );
  } catch (error) {
    callback(error);
  }
};

/**
 * updates an account
 * @param accountId
 *
 * @returns accountDetails - Object
 */
const updateAccount = (data = {}, callback) => {
  const { accountId, accountBalance } = data;
  lock
    .acquire(accountId, () => {
      const updatedAccount = bankRepository.updateAccount(
        accountId,
        accountBalance
      );
      callback(null, updatedAccount);
    })
    .catch((error) => {
      callback(error);
    });
};

/**
 * Persists the transaction history
 * @param transactionHistory object
 *
 */
const saveTransaction = (transactionHistory) => {
  return (savedHistory =
    bankRepository.saveTransactionHistory(transactionHistory));
};
exports.accountServices = {
  getAccountBalance,
  getAccountDetails,
  updateAccount,
  getTransactionHistory,
  saveTransaction,
};
