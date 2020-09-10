const handler = require('../handler');
const { STATUS_ERROR } = require('../../../utils/constants');

describe('event', () => {
  it('should not validate unhandled type', () => {
    const { status, message } = handler({});
    expect(status).toBe(STATUS_ERROR);
    expect(message).toBe('event was not handled');
  });
});
