const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should return the same line when 1 line is given', () => {
    assert.strictEqual(head('This is line', '\n', 10), 'This is line');
    const text = 'This is another line';
    assert.strictEqual(head(text, '\n', 10), 'This is another line');
  });

  it('Should return all the lines when 10 or less lines are given', () => {
    let text = 'line1\nline2\nline3\nline4\nline5';
    assert.strictEqual(head(text, '\n', 10), text);
    text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10';
    assert.strictEqual(head(text, '\n', 10), text);
  });

  it('Should return first 10 lines of the given text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10\nl11';
    const expectedText = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10';
    assert.strictEqual(head(text, '\n', 10), expectedText);
  });

  it('Should return given number of lines from the text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5';
    assert.strictEqual(head(text, '\n', 2), 'l1\nl2');
  });

  it('Should return all lines when number of lines are more than total', () => {
    const text = 'l1\nl2\nl3\nl4\nl5';
    assert.strictEqual(head(text, '\n', 10), 'l1\nl2\nl3\nl4\nl5');
  });

  it('Should return one character from the text', () => {
    let text = 'l1\nl2';
    assert.strictEqual(head(text, '', 1), 'l');
    text = 'This is line';
    assert.strictEqual(head(text, '', 1), 'T');
  });

  it('Should return 2 characters from the text', () => {
    const text = 'This is line';
    assert.strictEqual(head(text, '', 2), 'Th');
  });

  it('Should return given number of characters from the text', () => {
    const text = 'line1\nline2';
    assert.strictEqual(head(text, '', 7), 'line1\nl');
  });

  it('Should return all characters when count exceeds total', () => {
    const text = 'line';
    assert.strictEqual(head(text, '', 6), 'line');
  });

});
