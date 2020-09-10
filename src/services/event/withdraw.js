const {
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('../../utils/constants');
const Account = require('../../models/Account');

const withdraw = (event) => {
  try {
    const { id, balance } = Account.withdraw(event);
    return {
      status: STATUS_CREATED,
      message: { origin: { id, balance } },
    };
  } catch (error) {
    return {
      status: STATUS_NOT_FOUND,
      message: MESSAGE_NOT_FOUND,
    };
  }
};

module.exports = withdraw;
