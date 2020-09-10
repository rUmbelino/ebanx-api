const {
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('../../utils/constants');
const Account = require('../../models/Account');

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

module.exports = transfer;
