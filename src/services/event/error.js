const { STATUS_ERROR } = require('../../utils/constants');

const error = () => ({
  status: STATUS_ERROR,
  message: 'event type doesnt have a handler',
});

module.exports = error;
