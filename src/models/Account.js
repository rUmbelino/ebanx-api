const Storage = require('./Storage');

class Account {
  constructor(id, balance) {
    this._id = id;
    this._balance = balance;
  }

  get id() {
    return this._id;
  }

  get balance() {
    return this._balance;
  }

  static findById(account_id) {
    const accounts = Storage.getItem('accounts') || {};
    return accounts[account_id];
  }
}

module.exports = Account;
