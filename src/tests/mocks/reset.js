const reset = ({ accountStore, accountId, transactionHistoryStore }) => {
  accountStore[accountId].balance = 57900;
  transactionHistoryStore = [];
  return { accountStore, transactionHistoryStore };
};
module.exports = reset;
