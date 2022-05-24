const assert = require('assert');
const { headMain, getResult } = require('../../src/head/headLib.js');

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
      error: false,
      result: 'a\nb'
    });
  });

  it('Should return object containing file name and error', () => {
    assert.deepStrictEqual(getResult(mockedReadFile, 'b.txt', options), {
      fileName: 'b.txt',
      error: true,
      result: {
        name: 'readFileError',
        message: 'head: b.txt: No such file or directory',
        fileName: 'b.txt'
      }
    });
  });

});

const mockConsole = (expectedEles, actualEles) => {
  let index = 0;
  return (arg) => {
    actualEles.push(arg);
    assert.deepStrictEqual(arg, expectedEles[index]);
    index++;
  };
};

describe('headMain', () => {
  it('Should return the head of given file', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl';
    const mockedReadFile = mockReadFile('a.txt', content);
    const expected = ['a\nb\nc\nd\ne\nf\ng\nh\ni\nj'];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, 'a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should throw an error when file is not present', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb');
    const expected = ['head: b.txt: No such file or directory'];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, 'b.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return first 2 lines of given file', () => {
    const mockedReadFile = mockReadFile('a.txt', 'a\nb\nc\nd\ne');
    const expected = ['a\nb'];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, '-n', '2', 'a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return first 2 characters of given file', () => {
    const mockedReadFile = mockReadFile('a.txt', 'line1\nline2');
    const expected = ['li'];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, '-c', '2', 'a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return array of heads of given files', () => {
    const mockedReadFile = mockReadFile('a.txt', 'line1\nline2');
    const expected = [
      '==> a.txt <==',
      'line1\nline2',
      '==> a.txt <==',
      'line1\nline2'
    ];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, 'a.txt', 'a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return array of results and errors for non existing files', () => {
    const mockedReadFile = mockReadFile('a.txt', 'line1\nline2');
    const expected = [
      '==> a.txt <==',
      'line1\nline2',
      'head: b.txt: No such file or directory'
    ];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, 'a.txt', 'b.txt');
    assert.deepStrictEqual(actual, expected);
  });

});
