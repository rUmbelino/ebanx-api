const Account = require('./Account');

describe('Account', () => {
  it('should generate a new Account', () => {
    const account = new Account(1, 100);

    expect(account.id).toBe(1);
    expect(account.balance).toBe(100);
  });

  it('should not find unexisting account', () => {
    const account = Account.findById(25);
    expect(account).toBeUndefined();
  });
});
