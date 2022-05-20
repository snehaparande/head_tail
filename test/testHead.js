const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should return the same line when 1 line is given', () => {
    assert.equal(head('This is line', { noOfLines: 10 }), 'This is line');
    const text = 'This is another line';
    assert.equal(head(text, { noOfLines: 10 }), 'This is another line');
  });

  it('Should return all the lines when 10 or less lines are given', () => {
    let text = 'line1\nline2\nline3\nline4\nline5';
    assert.equal(head(text, { noOfLines: 10 }), text);
    text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10';
    assert.equal(head(text, { noOfLines: 10 }), text);
  });

  it('Should return first 10 lines of the given text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10\nl11';
    const expectedText = 'l1\nl2\nl3\nl4\nl5\nl6\nl7\nl8\nl9\nl10';
    assert.equal(head(text, { noOfLines: 10 }), expectedText);
  });

  it('Should return given number of lines from the text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5';
    assert.equal(head(text, { noOfLines: 2 }), 'l1\nl2');
  });

  it('Should return all lines when number of lines are more than total', () => {
    const text = 'l1\nl2\nl3\nl4\nl5';
    assert.equal(head(text, { noOfLines: 10 }), 'l1\nl2\nl3\nl4\nl5');
  });

});
