const assert = require('assert');
const { cutText, head } = require('../src/headLib.js');

describe('cutText', () => {
  it('Should return the same line when 1 line is given', () => {
    assert.strictEqual(cutText('This is line', '\n', 10), 'This is line');
    const text = 'This is another line';
    assert.strictEqual(cutText(text, { separator: '\n', count: 10 }), text);
  });

  it('Should return all the lines when 10 or less lines are given', () => {
    let text = 'line1\nline2\nline3\nline4\nline5';
    assert.strictEqual(cutText(text, { separator: '\n', count: 10 }), text);
    text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10';
    assert.strictEqual(cutText(text, { separator: '\n', count: 10 }), text);
  });

  it('Should return first 10 lines of the given text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10\nl11';
    const expected = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10';
    assert.strictEqual(cutText(text, { separator: '\n', count: 10 }), expected);
  });

  it('Should return given number of lines from the text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5';
    assert.strictEqual(cutText(text, { separator: '\n', count: 2 }), 'l1\nl2');
  });

  it('Should return all lines when number of lines are more than total', () => {
    const text = 'l1\nl2\nl3\nl4\nl5';
    assert.strictEqual(cutText(text, { separator: '\n', count: 10 }), text);
  });

  it('Should return one character from the text', () => {
    let text = 'l1\nl2';
    assert.strictEqual(cutText(text, { separator: '', count: 1 }), 'l');
    text = 'This is line';
    assert.strictEqual(cutText(text, { separator: '', count: 1 }), 'T');
  });

  it('Should return 2 characters from the text', () => {
    const text = 'This is line';
    assert.strictEqual(cutText(text, { separator: '', count: 2 }), 'Th');
  });

  it('Should return given number of characters from the text', () => {
    const text = 'line1\nline2';
    assert.strictEqual(cutText(text, { separator: '', count: 7 }), 'line1\nl');
  });

  it('Should return all characters when count exceeds total', () => {
    const text = 'line';
    assert.strictEqual(cutText(text, { separator: '', count: 6 }), 'line');
  });

});

describe('head', () => {
  it('Should return 2 lines from the text', () => {
    const text = 'l1\nl2\nl3';
    assert.strictEqual(head(text, { option: '-n', optionArg: 2 }), 'l1\nl2');
  });

  it('Should return 2 charactors from the text', () => {
    const text = 'l1\nl2\nl3';
    assert.strictEqual(head(text, { option: '-c', optionArg: 2 }), 'l1');
  });

});
