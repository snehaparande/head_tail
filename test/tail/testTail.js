const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('Should return the same line when 1 line is given', () => {
    let content = 'This is line';
    assert.strictEqual(tail(content, { option: '-n', count: 10 }), content);
    content = 'This is another line';
    assert.strictEqual(tail(content, { option: '-n', count: 10 }), content);
  });

  it('Should return all the lines when 10 or less lines are given', () => {
    let content = 'line1\nline2\nline3\nline4\nline5';
    assert.strictEqual(tail(content, 10), content);
    content = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10';
    assert.strictEqual(tail(content, { option: '-n', count: 10 }), content);
  });

  it('Should return last 10 lines of the given content', () => {
    const content = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10\nl11';
    const expected = 'l2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10\nl11';
    assert.strictEqual(tail(content, { option: '-n', count: 10 }), expected);
  });

  it('Should return given number of lines from the content', () => {
    const content = 'l1\nl2\nl3\nl4\nl5';
    assert.strictEqual(tail(content, { option: '-n', count: 2 }), 'l4\nl5');
  });

  it('Should return all lines when number of lines are more than total', () => {
    const content = 'l1\nl2\nl3\nl4\nl5';
    assert.strictEqual(tail(content, { option: '-n', count: 10 }), content);
  });

  it('Should return one character from the text', () => {
    let text = 'l1\nl2';
    assert.strictEqual(tail(text, { option: '-c', count: 1 }), '2');
    text = 'This is line';
    assert.strictEqual(tail(text, { option: '-c', count: 1 }), 'e');
  });

  it('Should return given number of characters from the text', () => {
    const text = 'line1\nline2';
    assert.strictEqual(tail(text, { option: '-c', count: 7 }), '1\nline2');
  });

  it('Should return all characters when count exceeds total', () => {
    const text = 'line';
    assert.strictEqual(tail(text, { option: '-c', count: 6 }), 'line');
  });

});
