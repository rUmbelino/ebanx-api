const transfer = require('../transfer');
const {
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('../../../utils/constants');
const Storage = require('../../../models/Storage');
const Account = require('../../../models/Account');

describe('transfer', () => {
  beforeEach(() => {
    Storage.reset();
    jest.clearAllMocks();
  });

  it('should fail on transfer from non existing account with 404', () => {
    const amount = 100;
    const origin = 1;
    const destination = 2;

    const { status, message } = transfer({
      origin,
      amount,
      destination,
    });

    expect(status).toBe(STATUS_NOT_FOUND);
    expect(message).toBe(MESSAGE_NOT_FOUND);
  });

  it('should succeed on transfer from existing account', () => {
    const amount = 100;
    const origin = '1';
    const destination = '2';

    Account.deposit({ destination: origin, amount: 250 });
    const { status, message } = transfer({
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
