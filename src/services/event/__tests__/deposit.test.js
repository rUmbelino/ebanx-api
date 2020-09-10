const deposit = require('../deposit');
const { STATUS_CREATED } = require('../../../utils/constants');

describe('deposit', () => {
  it('should sucessfylly handle deposit event', () => {
    const type = 'deposit';
    const amount = 150;
    const destination = '10';
    const { status, message } = deposit({ type, amount, destination });
    expect(status).toBe(STATUS_CREATED);
    expect(message).toEqual({
      destination: {
        balance: amount,
        id: destination,
      },
    });
  });
});
