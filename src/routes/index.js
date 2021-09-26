const bodyParser = require("body-parser");
const { initiateTransactionSchema } = require("../validators/account");
const validate = require("../middlewares/validators");
const {
  getAccountBalance,
  initiateTransaction,
  getTransactionHistory,
} = require("../controllers/account");

module.exports.setup = function setup(server) {
  // parse application/json
  server.use(bodyParser.json());

  server.get(
    {
      path: "/",
      name: "app health check",
      version: "1.0.0",
    },
    (req, res) => res.send("Welcome to the Test API Service")
  );

  server.get(
    {
      path: "/account/balance/:accountId",
      name: "Get account balance",
      version: "1.0.0",
    },
    (req, res) => getAccountBalance(req, res)
  );

  server.get(
    {
      path: "/account/history/:accountId",
      name: "Get account balance",
      version: "1.0.0",
    },
    (req, res) => getTransactionHistory(req, res)
  );

  server.post(
    {
      path: "/account/transaction/:accountId",
      name: "Get vehicle data",
      version: "1.0.0",
    },
    validate(initiateTransactionSchema),
    (req, res) => initiateTransaction(req, res)
  );
};
