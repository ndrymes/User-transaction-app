const { accountStore, transactionHistoryStore } = require('../db/database');

const getAccount = (accountId) => {
  const userAccount = accountStore[accountId];
  return userAccount;
};

const updateAccount = (accountId, updatedBalance) => {
  const userAccount = accountStore[accountId];
  userAccount.balance = updatedBalance;
  userAccount.updatedAt = new Date();
  return userAccount;
};

const saveTransactionHostory = (transactionHistory) => {
  transactionHistoryStore.push(transactionHistory);
};
const getTransactionHostory = () => transactionHistoryStore;
exports.bankRepository = {
  getAccount: (accountId) => getAccount(accountId),
  getTransactionHostory: () => getTransactionHostory(),
  updateAccount: (accountId, updatedBalance) => updateAccount(accountId, updatedBalance),
  saveTransactionHostory: (transactionHistory) => saveTransactionHostory(transactionHistory),
};
