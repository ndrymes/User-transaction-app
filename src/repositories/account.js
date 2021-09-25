const { accountStore, transactionHistoryStore } = require('../db/database');

const getAccount = (accountId) => {
  const userAccount = accountStore[accountId];
  return userAccount;
};

const updateAccount = (accountId, updatedBalance) => {
  const userAccount = accountStore[accountId];
  console.log({userAccount,updatedBalance} );
  userAccount.balance = updatedBalance;
  userAccount.updatedAt = new Date();
  return userAccount;
};

const saveTransactionHostory = (transactionHistory) => {
  transactionHistoryStore.push(transactionHistory);
};
exports.bankRepository = {
  getAccount: (accountId) => getAccount(accountId),
  updateAccount: (accountId, updatedBalance) => updateAccount(accountId, updatedBalance),
  saveTransactionHostory: (transactionHistory) => saveTransactionHostory(transactionHistory),
};
