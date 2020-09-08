const Storage = require('./Storage');

class Account {
  constructor(id, balance = 0) {
    this._id = id || new Date().getTime();
    this._balance = balance;
  }

  get id() {
    return this._id;
  }

  get balance() {
    return this._balance;
  }

  set balance(balance) {
    this._balance = balance;
  }

  static findById(account_id) {
    const accounts = Storage.getItem('accounts') || {};
    return accounts[account_id];
  }

  persist() {
    let accounts = Storage.getItem('accounts') || {};
    accounts = { ...accounts, [this.id]: this };
    Storage.setItem('accounts', accounts);
  }

  static deposit({ destination, amount }) {
    let account = this.findById(destination);
    if (!account) {
      account = new Account(Number(destination));
    }

    account.balance += Number(amount);
    account.persist();
    return account;
  }
}

module.exports = Account;
