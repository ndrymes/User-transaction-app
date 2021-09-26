const { resetDB } = require("../mocks");
const { accountServices } = require("../../services/index");
const {
  accountStore,
  transactionHistoryStore,
  accountId,
} = require("../../db/database");
const { error } = require("../../helpers/logger");

beforeAll(() =>
  resetDB({ accountStore, accountId: accountId, transactionHistoryStore })
);

/**
 * The unit tests for accountServices is being done in Isolation
 * without a connection to any database or other components of the codebase.
 *
 * The pattern being used here is called arrange-act-assert (AAA).
 * Its used to make the test cleaner by the different actions being taken into different sections based on what they do.
 * https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80
 */
describe("Single User Accounting System", () => {
  describe("getAccountBalance", () => {
    it("returns user account balance", async () => {
      // Act
      accountServices.getAccountBalance(accountId, (error, accountBalance) => {
        if (error) {
          expect(error.message).toEqual("Service Unavailable");
        } else {
          // Assert
          expect(accountBalance).toStrictEqual(57900);
        }
      });
    });
  });

  describe("getAccountDetails", () => {
    it("returns user account details", async () => {
      //Act
      accountServices.getAccountDetails(accountId, (error, accountDetails) => {
        if (error) {
          expect(error.message).toEqual("Service Unavailable");
        } else {
          // Assert
          expect(accountDetails.balance).toStrictEqual(57900);
          expect(accountDetails.accountId).toStrictEqual(accountId);
        }
      });
    });
  });

  describe("getAccountHistory", () => {
    it("returns account transaction history", async () => {
      accountServices.getTransactionHistory(
        accountId,
        (error, accountHistory) => {
          if (error) {
            expect(error.message).toEqual("Service Unavailable");
          } else {
            expect(accountHistory).toHaveProperty("transactionHistory");
          }
        }
      );
    });
  });
});

describe("updateAccountDetails", () => {
  it("returns updated account details", async () => {
    accountServices.updateAccount(
      { accountId, accountBalance: 60000 },
      (error, accountDetails) => {
        if (error) {
          expect(error.message).toEqual("Service Unavailable");
        } else {
          expect(accountDetails.balance).toStrictEqual(60000);
          expect(accountDetails.accountId).toStrictEqual(accountId);
        }
      }
    );
  });
});
