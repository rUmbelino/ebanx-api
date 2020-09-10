const Account = require('./Account');
const Storage = require('./Storage');

describe('Account', () => {
  beforeEach(() => {
    Storage.reset();
    jest.clearAllMocks();
  });

  it('should generate a new Account', () => {
    const account = new Account(1, 100);

    expect(account.id).toBe('1');
    expect(account.balance).toBe(100);
  });

  it('should not find unexisting account', () => {
    const account = Account.findById(25);
    expect(account).toBeUndefined();
  });

  it('should deposit value on non existing account', () => {
    const account = Account.deposit({ id: 100, amount: 10 });
    expect(account.balance).toBe(10);
  });

  it('should persist account', () => {
    const spy = jest.spyOn(Storage, 'setItem');
    const account = Account.deposit(1, 420);
    account.persist();

    expect(spy).toHaveBeenCalled();
  });

  it('should fail on make withdraw from non existing account', () => {
    try {
      Account.withdraw({});
    } catch (error) {
      expect(error.message).toBe('Cannow withdraw from non existing account');
    }
  });

  it('should sucessfull make withdraw from account', () => {
    const origin = 1;
    Account.deposit({ destination: origin, amount: 420 });
    const account = Account.withdraw({ origin, amount: 400 });
    expect(account.balance).toBe(20);
  });

  it('should fail on transfer from non existing account', () => {
    try {
      Account.transfer({ origin: '100', amount: 15, destination: '300' });
    } catch ({ message }) {
      expect(message).toBe('Cannot transfer from non existing account');
    }
  });

  it('should successfuly tranfer from origin to destionation', () => {
    Account.deposit({ destination: 100, amount: 115 });
    const { origin, destination } = Account.transfer({
      origin: '100',
      amount: 15,
      destination: '300',
    });

    expect(origin.id).toBe('100');
    expect(origin.balance).toBe(100);
    expect(destination.id).toBe('300');
    expect(destination.balance).toBe(15);
  });
});
