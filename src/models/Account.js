const Storage = require('./Storage');

class Account {
  constructor(id, balance) {
    this.id = id;
    this.balance = balance;
  }

  get balance() {
    return this.balance;
  }

  static findById(account_id) {
    const accounts = Storage.getItem('accounts') || [];
    return accounts.find(({ id }) => id === account_id);
  }
}

module.exports = Account;
