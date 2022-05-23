const assert = require('assert');
const { createIterator } = require('../src/iterator.js');

describe('createIterator', () => {
  it('Should return current element of iterator', () => {
    const iterator = createIterator([1, 2]);
    assert.strictEqual(iterator.current(), 1);
  });

  it('Should return next element of iterator and increment the index', () => {
    const iterator = createIterator([1, 2]);
    assert.strictEqual(iterator.next(), 2);
    assert.strictEqual(iterator.index, 1);
  });

  it('Should return rest of the elements of the iterator', () => {
    const iterator = createIterator([1, 2]);
    assert.deepStrictEqual(iterator.restOf(), [1, 2]);
  });

});
