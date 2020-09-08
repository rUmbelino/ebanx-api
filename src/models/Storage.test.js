const Storage = require('./Storage');

describe('Storage', () => {
  it('should get and set value', () => {
    const name = 'Rafael';
    Storage.setItem('name', name);

    expect(Storage.getItem('name')).toBe(name);
    Storage.reset();
    expect(Storage.getItem('name')).toBeUndefined();
  });
});
