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
const getAccountBalance = (accountId, callback) => {
  try {
    if (lock.isBusy(accountId)) handleError('Service Unavailable', 503);
    const userAccount = bankRepository.getAccount(accountId);
    const accountBalance = userAccount.balance;
    callback(null, accountBalance);
  } catch (error) {
    callback(error);
  }
};

exports.bankServices = {
  getAccountBalance,
};
