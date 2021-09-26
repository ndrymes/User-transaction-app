jest.setTimeout(15000);
const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../../app");
chai.use(chaiHttp);
const {
  accountStore,
  transactionHistoryStore,
  accountId,
} = require("../../db/database");
const { mockPayload, resetDB } = require("../mocks");

beforeAll(() => resetDB({ accountStore, accountId, transactionHistoryStore }));

describe("Payment App Integration Test", () => {
  describe("Fetch balance /account/balance/:accountId", () => {
    it("should respond with user balance", (done) => {
      chai
        .request(app)
        .get("/account/balance/60d9b43387812e0011504aec")
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.error).toBe(false);
          expect(res.body.message).toBe("Data gotten successfully");
          expect(res.body.data).toStrictEqual({"accountBalance": 57900});
          done();
        });
    });
  });

  describe("Credit User  /account/transaction/:accountId", () => {
    it("should credit user with an amount ", (done) => {
      chai
        .request(app)
        .post("/account/transaction/60d9b43387812e0011504aec")
        .send(mockPayload.creditRequestBody)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.error).toBe(false);
          expect(res.body.message).toBe("Data gotten successfully");
          expect(res.body.data.balance).toBe(59900);
          done();
        });
    });

    it("should get the account history ", (done) => {
      chai
        .request(app)
        .get("/account/history/60d9b43387812e0011504aec")
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.error).toBe(false);
          expect(res.body.message).toBe("Data gotten successfully");
          expect(res.body.data).toHaveProperty("transactionHistory");
          expect(res.body.data.transactionHistory[0].type).toBe("credit");

          done();
        });
    });
  });

  describe("Debit User  /account/transaction/:accountId", () => {
    it("should debit user with an amount ", (done) => {
      chai
        .request(app)
        .post("/account/transaction/60d9b43387812e0011504aec")
        .send(mockPayload.debitRequestBody)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.error).toBe(false);
          expect(res.body.message).toBe("Data gotten successfully");
          expect(res.body.data.balance).toBe(57900);
          done();
        });
    });

    it("should get the account history ", (done) => {
      chai
        .request(app)
        .get("/account/history/60d9b43387812e0011504aec")
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.error).toBe(false);
          expect(res.body.message).toBe("Data gotten successfully");
          expect(res.body.data).toHaveProperty("transactionHistory");
          expect(res.body.data.transactionHistory[1].type).toBe("debit");

          done();
        });
    });
  });
});
