const eventHandler = require('./event');
const {
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('../utils/constants');
const Storage = require('../models/Storage');
const Account = require('../models/Account');

describe('event', () => {
  beforeEach(() => {
    Storage.reset();
    jest.clearAllMocks();
  });

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
    const destination = '10';
    const { status, message } = eventHandler({ type, amount, destination });
    expect(status).toBe(STATUS_CREATED);
    expect(message).toEqual({
      destination: {
        balance: amount,
        id: destination,
      },
    });
  });

  it('should fail on withdraw event with 404', () => {
    const type = 'withdraw';
    const amount = 150;
    const origin = 10;
    const { status, message } = eventHandler({ type, amount, origin });
    expect(status).toBe(STATUS_NOT_FOUND);
    expect(message).toEqual(MESSAGE_NOT_FOUND);
  });

  it('should succed on withdraw', () => {
    const type = 'withdraw';
    const amount = 150;
    const origin = '10';

    Account.deposit({ destination: origin, amount: 200 });

    const { status, message } = eventHandler({ type, amount, origin });
    expect(status).toBe(STATUS_CREATED);
    expect(message).toEqual({
      origin: {
        id: origin,
        balance: 50,
      },
    });
  });

  it('should fail on transfer from non existing account with 404', () => {
    const type = 'transfer';
    const amount = 100;
    const origin = 1;
    const destination = 2;

    const { status, message } = eventHandler({
      type,
      origin,
      amount,
      destination,
    });

    expect(status).toBe(STATUS_NOT_FOUND);
    expect(message).toBe(MESSAGE_NOT_FOUND);
  });

  it('should succeed on transfer from existing account', () => {
    const type = 'transfer';
    const amount = 100;
    const origin = '1';
    const destination = '2';

    Account.deposit({ destination: origin, amount: 250 });
    const { status, message } = eventHandler({
      type,
      origin,
      amount,
      destination,
    });

    expect(status).toBe(STATUS_CREATED);
    expect(message).toEqual({
      origin: {
        id: origin,
        balance: 150,
      },
      destination: {
        id: destination,
        balance: amount,
      },
    });
  });
});