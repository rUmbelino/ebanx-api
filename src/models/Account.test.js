const Account = require('./Account');
const Storage = require('./Storage');

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

  it('should deposit value on unexisting account', () => {
    const account = Account.deposit({ id: 100, amount: 10 });
    expect(account.balance).toBe(10);
  });

  it('should persist account', () => {
    const spy = jest.spyOn(Storage, 'setItem');
    const account = Account.deposit(1, 420);
    account.persist();

    expect(spy).toHaveBeenCalled();
  });
});
