const Joi = require('joi');
const { allowedType } = require('../constants/account');

const initiateTransaction = (data) => {
  const schema = Joi.object({
    type: Joi.string()
      .required().valid(...allowedType),
    amount: Joi.number()
      .required(),
  });
  return schema.validate(data);
};

exports.validators = {
  initiateTransaction,
};
