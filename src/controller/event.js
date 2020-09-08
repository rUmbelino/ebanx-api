const { STATUS_CREATED } = require('../routes/constants');
const Account = require('../models/Account');

const eventHandler = (event) => {
  let status;
  let message;
  const { type } = event;

  if (type === 'deposit') {
    const { id, balance } = Account.deposit(event);
    status = STATUS_CREATED;
    message = { destination: { id, balance } };
  } else {
    throw new Error('event was not handled');
  }

  return { status, message };
};

module.exports = eventHandler;
