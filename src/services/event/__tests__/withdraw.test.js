const withdraw = require('../withdraw');
const Storage = require('../../../models/Storage');
const Account = require('../../../models/Account');
const {
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('../../../utils/constants');

describe('withdraw', () => {
  beforeEach(() => {
    Storage.reset();
    jest.clearAllMocks();
  });

  it('should fail on withdraw event with 404', () => {
    const amount = 150;
    const origin = 10;
    const { status, message } = withdraw({ amount, origin });
    expect(status).toBe(STATUS_NOT_FOUND);
    expect(message).toEqual(MESSAGE_NOT_FOUND);
  });

  it('should succed on withdraw', () => {
    const amount = 150;
    const origin = '10';

    Account.deposit({ destination: origin, amount: 200 });

    const { status, message } = withdraw({ amount, origin });
    expect(status).toBe(STATUS_CREATED);
    expect(message).toEqual({
      origin: {
        id: origin,
        balance: 50,
      },
    });
  });
});
