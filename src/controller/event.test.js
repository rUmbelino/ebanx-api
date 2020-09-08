const eventHandler = require('./event');
const { STATUS_CREATED } = require('../routes/constants');

describe('event', () => {
  it('should throw error on recive unhandled type', () => {
    try {
      eventHandler({});
    } catch (error) {
      expect(error.message).toBe('event was not handled');
    }
  });

  it('should sucessfylly handle deposit event', () => {
    const type = 'deposit';
    const amount = 150;
    const destination = 10;
    const { status, message } = eventHandler({ type, amount, destination });
    expect(status).toBe(STATUS_CREATED);
    expect(message).toEqual({
      destination: {
        balance: amount,
        id: destination,
      },
    });
  });
});
