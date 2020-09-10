const {
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('../utils/constants');
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

const transfer = ({ origin, amount, destination }) => {
  try {
    const {
      origin: originAccount,
      destination: destinationAccount,
    } = Account.transfer({
      origin,
      amount,
      destination,
    });

    const status = STATUS_CREATED;
    const message = {
      origin: {
        id: originAccount.id,
        balance: originAccount.balance,
      },
      destination: {
        id: destinationAccount.id,
        balance: destinationAccount.balance,
      },
    };

    return {
      status,
      message,
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
  } else if (type === 'transfer') {
    const response = transfer(event);
    status = response.status;
    message = response.message;
  } else {
    throw new Error('event was not handled');
  }

  return { status, message };
};

module.exports = eventHandler;
