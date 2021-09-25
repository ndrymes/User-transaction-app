const { accountStore, transactionHistoryStore } = require('../db/database');

const getAccount = (accountId) => {
  const userAccount = accountStore[accountId];
  return userAccount;
};

const saveTransactionHostory = (transactionHistory) => {
  transactionHistoryStore.push(transactionHistory);
};
exports.bankRepository = {
  getAccount: (accountId) => getAccount(accountId),
  saveTransactionHostory: (transactionHistory) => saveTransactionHostory(transactionHistory),
};
