const assert = require('assert');
const {
  head,
  firstNLines,
  firstNBytes,
  getExitCode,
  slicer
} = require('../src/headLib.js');

describe('firstNLines', () => {
  const defaultCount = 5;

  it('Should return given text when lines are less than or equal to count',
    () => {
      let text = 'line1\nline2';
      assert.strictEqual(firstNLines(text, defaultCount), text);
      text = 'l1\nl2\nl3\nl4\nl5';
      assert.strictEqual(firstNLines(text, defaultCount), text);
    });

  it('Should return first N lines of the given text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5\nl6\nl7';
    assert.strictEqual(firstNLines(text, defaultCount), 'l1\nl2\nl3\nl4\nl5');
  });

  it('Should return empty string when text is empty or count is 0', () => {
    let text = '';
    assert.strictEqual(firstNLines(text, defaultCount), text);
    text = 'line1';
    assert.strictEqual(firstNLines(text, 0), '');
  });

});

describe('firstNBytes', () => {
  const defaultCount = 5;

  it('Should return given text when characters are less than or equal to count',
    () => {
      let text = 'l1';
      assert.strictEqual(firstNBytes(text, defaultCount), text);
      text = 'line1';
      assert.strictEqual(firstNBytes(text, defaultCount), text);
    });

  it('Should return first N characters of the given text', () => {
    const text = 'l1\nl2\nl3\nl4\nl5';
    assert.strictEqual(firstNBytes(text, defaultCount), 'l1\nl2');
  });

  it('Should return empty string when text is empty or count is 0', () => {
    let text = '';
    assert.strictEqual(firstNBytes(text, defaultCount), text);
    text = 'line1';
    assert.strictEqual(firstNBytes(text, 0), '');
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

describe('getExitCode', () => {
  it('Should return 0 when no erro is present', () => {
    const results = [{ error: false }, { error: false }, { error: false }];
    assert.strictEqual(getExitCode(results), 0);
  });

  it('Should return 1 when error is present', () => {
    const results = [{ error: false }, { error: true }, { error: false }];
    assert.strictEqual(getExitCode(results), 1);
  });

});

describe('slicer', () => {
  it('Should return a reference of \'firstNLines\' function', () => {
    assert.strictEqual(slicer('-n'), firstNLines);
  });

  it('Should return a reference of \'firstNBytes\' function', () => {
    assert.strictEqual(slicer('-c'), firstNBytes);
  });

});
