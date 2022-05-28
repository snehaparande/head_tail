const assert = require('assert');
const { fileNotFoundError } = require('../src/validation');
const { headMain, headOfFile, readFile } = require('../src/headLib.js');

const mockReadFile = (fileContents) => {
  return (actualFile, unicode) => {
    assert.ok(fileContents[actualFile]);
    assert.strictEqual(unicode, 'utf8');
    return fileContents[actualFile];
  };
};

describe('readFile', () => {
  let fileName = 'a.txt';
  const content = 'line1\nline2';
  const fileReader = mockReadFile({ 'a.txt': content });
  it('Should return an object containing file contents when file exists',
    () => {
      assert.deepStrictEqual(readFile(fileReader, fileName), {
        fileName,
        content
      });
    });

  it('Should return an object containing error when file doesn\'t exist',
    () => {
      fileName = 'b.txt';
      const error = fileNotFoundError(fileName);
      assert.deepStrictEqual(readFile(fileReader, fileName), {
        fileName,
        error
      });
    });

});

describe('headOfFile', () => {
  const mockedReadFile = mockReadFile({ 'a.txt': 'a\nb\nc' });
  const options = { option: '-n', optionArg: 2 };

  it('Should return an object containing file name and head', () => {
    assert.deepStrictEqual(headOfFile(mockedReadFile, 'a.txt', options), {
      fileName: 'a.txt',
      error: false,
      result: 'a\nb'
    });
  });

  it('Should return object containing file name and error', () => {
    assert.deepStrictEqual(headOfFile(mockedReadFile, 'b.txt', options), {
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
  it('Should print the head of given file', () => {
    const content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl';
    const mockedReadFile = mockReadFile({ 'a.txt': content });
    const expected = ['a\nb\nc\nd\ne\nf\ng\nh\ni\nj'];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, 'a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should print an error when file is not present', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'a\nb' });
    const expected = ['head: b.txt: No such file or directory'];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, 'b.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should print first 2 lines of given file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'a\nb\nc\nd\ne' });
    const expected = ['a\nb'];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, '-n', '2', 'a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should print first 2 characters of given file', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'line1\nline2' });
    const expected = ['li'];
    const actual = [];
    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, '-c', '2', 'a.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should print heads of given files with header for each file', () => {
    const mockedReadFile = mockReadFile({
      'a.txt': 'line1\nline2',
      'b.txt': 'line1\nline2',
    });

    const expected = [
      '==> a.txt <==',
      'line1\nline2',
      '==> b.txt <==',
      'line1\nline2'
    ];
    const actual = [];

    const mockedConsole = mockConsole(expected, actual);
    headMain(mockedReadFile, mockedConsole, mockedConsole, 'a.txt', 'b.txt');
    assert.deepStrictEqual(actual, expected);
  });

  it('Should print heads of given files and errors for non-existing files', () => {
    const mockedReadFile = mockReadFile({ 'a.txt': 'line1\nline2' });
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
