const {
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('../routes/constants');
const Account = require('../models/Account');

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

const eventHandler = (event) => {
  let status;
  let message;
  const { type } = event;

  if (type === 'deposit') {
    const { id, balance } = Account.deposit(event);
    status = STATUS_CREATED;
    message = { destination: { id, balance } };
  } else if (type === 'withdraw') {
    const response = withdraw(event);
    status = response.status;
    message = response.message;
  } else {
    throw new Error('event was not handled');
  }

  return { status, message };
};

module.exports = eventHandler;
