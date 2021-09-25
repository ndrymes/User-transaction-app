/* ---------------------------- in memory store ---------------------------- */
const accountId = '60d9b43387812e0011504aec';
const userId = '60d9b72887812e0011504b0d';

exports.accountId = accountId;
exports.accountStore = {
  [accountId]: {
    balance: 0,
    ledgerBalance: 0,
    deleted: false,
    userId,
    accountId,
    createdAt: '2021-06-28T11:48:15.731Z',
    updatedAt: '2021-06-28T11:48:15.731Z',
  },
};
exports.transactionHistoryStore = [];
