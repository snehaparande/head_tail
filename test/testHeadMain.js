const assert = require('assert');
const { headMain, getResult } = require('../src/headLib.js');

const mockReadFile = (fileName, content) => {
  return (actualFile, unicode) => {
    assert.strictEqual(fileName, actualFile);
    assert.strictEqual(unicode, 'utf8');
    return content;
  };
};

describe('getResult', () => {
  const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc');
  const options = { option: '-n', optionArg: 2 };

  it('Should return an object containing file name and head', () => {
    assert.deepStrictEqual(getResult(mockedReadFile, 'a.txt', options), {
      fileName: 'a.txt',
      result: 'a\nb'
    });
  });

  it('Should return object containing file name and error', () => {
    assert.deepStrictEqual(getResult(mockedReadFile, 'b.txt', options), {
      fileName: 'b.txt',
      error: {
        name: 'readFileError',
        message: 'head: b.txt: No such file or directory',
        fileName: 'b.txt'
      }
    });
  });

});

describe('headMain', () => {
  it('Should return the head of given file', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl';
    const mockedReadFile = mockReadFile('a.txt', content);
    const expected = [{
      fileName: 'a.txt',
      result: 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj'
    }];
    assert.deepStrictEqual(headMain(mockedReadFile, 'a.txt'), expected);
  });

  it('Should throw an error when file is not present', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb');
    const expected = [{
      fileName: 'b.txt',
      error: {
        name: 'readFileError',
        message: 'head: b.txt: No such file or directory',
        fileName: 'b.txt'
      }
    }];
    assert.deepStrictEqual(headMain(mockedReadFile, 'b.txt'), expected);
  });

  it('Should return first 2 lines of given file', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc\nd\ne');
    const expected = [{ fileName: 'a.txt', result: 'a\nb' }];
    assert.deepStrictEqual(headMain(mockedReadFile, '-n', '2', 'a.txt'), expected);
  });

  it('Should return first 2 characters of given file', () => {
    const mockedReadFile = mockReadFile('a.txt', 'line1\nline2');
    const expected = [{ fileName: 'a.txt', result: 'li' }];
    assert.deepStrictEqual(headMain(mockedReadFile, '-c', '2', 'a.txt'), expected);
  });

  it('Should return array of heads of given files', () => {
    const mockedReadFile = mockReadFile('a.txt', 'line1\nline2');
    const expected = [
      { fileName: 'a.txt', result: 'line1\nline2' },
      { fileName: 'a.txt', result: 'line1\nline2' }
    ];
    assert.deepStrictEqual(headMain(mockedReadFile, 'a.txt', 'a.txt'), expected);
  });

  it('Should return array of results and errors for non existing files', () => {
    const mockedReadFile = mockReadFile('a.txt', 'line1\nline2');
    const expected = [
      { fileName: 'a.txt', result: 'line1\nline2' },
      {
        fileName: 'b.txt', error: {
          name: 'readFileError',
          message: 'head: b.txt: No such file or directory',
          fileName: 'b.txt'
        }
      }
    ];
    assert.deepStrictEqual(headMain(mockedReadFile, 'a.txt', 'b.txt'), expected);
  });

});
