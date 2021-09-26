const Joi = require("joi");
const { transactionTypeValues } = require("../constants/account");

const initiateTransactionSchema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...transactionTypeValues),
  amount: Joi.number().required(),
});

module.exports = {
  initiateTransactionSchema,
};
