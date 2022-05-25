const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('Should return the same line when 1 line is given', () => {
    assert.strictEqual(tail('This is line'), 'This is line');
    assert.strictEqual(tail('This is another line'), 'This is another line');
  });

  it('Should return all the lines when 10 or less lines are given', () => {
    let text = 'line1\nline2\nline3\nline4\nline5';
    assert.strictEqual(tail(text), text);
    text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10';
    assert.strictEqual(tail(text), text);
  });

  it('Should return last 10 lines of the given text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10\nl11';
    const expected = 'l2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10\nl11';
    assert.strictEqual(tail(text), expected);
  });

});