const getError = require('./error');
const deposit = require('./deposit');
const transfer = require('./transfer');
const withdraw = require('./withdraw');

const handler = {
  deposit,
  transfer,
  withdraw,
};

const tryHandle = (event) => {
  try {
    return handler[event.type](event);
  } catch (error) {
    return getError();
  }
};

module.exports = tryHandle;
