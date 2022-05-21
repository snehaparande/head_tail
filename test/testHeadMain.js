const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = (fileName, content) => {
  return (actualFile, unicode) => {
    assert.strictEqual(fileName, actualFile);
    assert.strictEqual(unicode, 'utf8');
    return content;
  };
};
describe('headMain', () => {
  it('Should return the head of given file', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl';
    const mockedReadFile = mockReadFile('a.txt', content);
    const expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(headMain(mockedReadFile, 'a.txt'), expected);
  });

  it('Should throw an error when file is not present', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb');
    const expected = {
      name: 'readFileError',
      message: 'head: b.txt: No such file or directory',
      fileName: 'b.txt'
    };
    assert.throws(() => headMain(mockedReadFile, 'b.txt'), expected);
  });

  it('Should return first 2 lines of given file', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc\nd\ne');
    const expected = 'a\nb';
    assert.strictEqual(headMain(mockedReadFile, '-n', 2, 'a.txt'), expected);
  });

  it('Should return first 2 characters of given file', () => {
    const mockedReadFile = mockReadFile('a.txt', 'line1\nline2');
    const expected = 'li';
    assert.strictEqual(headMain(mockedReadFile, '-c', 2, 'a.txt'), expected);
  });

});
