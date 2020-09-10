const Account = require('../../models/Account');
const { STATUS_CREATED } = require('../../utils/constants');

const deposit = ({ destination, amount }) => {
  const { id, balance } = Account.deposit({ destination, amount });
  const status = STATUS_CREATED;
  const message = { destination: { id, balance } };

  return {
    status,
    message,
  };
};

module.exports = deposit;
