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

const saveTransactionHistory = (transactionHistory) => {
  transactionHistoryStore.push(transactionHistory);
};
const getTransactionHistory = () => transactionHistoryStore;
exports.bankRepository = {
  getAccount: (accountId) => getAccount(accountId),
  getTransactionHistory: () => getTransactionHistory(),
  updateAccount: (accountId, updatedBalance) => updateAccount(accountId, updatedBalance),
  saveTransactionHistory: (transactionHistory) => saveTransactionHistory(transactionHistory),
};
