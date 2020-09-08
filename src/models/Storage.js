let store = {};

class Storage {
  static getItem(key) {
    return store[key];
  }

  static setItem(key, value) {
    store[key] = value;
  }

  static reset() {
    store = {};
  }
}

module.exports = Storage;
