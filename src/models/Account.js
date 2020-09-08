const Storage = require('./Storage');

class Account {
  constructor(id, balance = 0) {
    this._id = id;
    this._balance = balance;
  }

  get id() {
    return this._id;
  }

  get balance() {
    return this._balance;
  }

  set balance(balance) {
    this._balance += balance;
  }

  static findById(account_id) {
    const accounts = Storage.getItem('accounts') || {};
    return accounts[account_id];
  }

  static deposit({ id, amount }) {
    let account = this.findById(id);
    if (!account) {
      account = new Account(id);
    }

    account.balance += amount;
    return account;
  }
}

module.exports = Account;
