const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse only file name ', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), {
      fileName: ['a.txt'],
      option: { option: '-n', optionArg: 10 }
    });
  });

  it('Should parse -n option along with file name ', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), {
      fileName: ['a.txt'],
      option: { option: '-n', optionArg: 5 }
    });
  });

  it('Should parse -c option along with file name ', () => {
    assert.deepStrictEqual(parseArgs(['-c', '5', 'a.txt']), {
      fileName: ['a.txt'],
      option: { option: '-c', optionArg: 5 }
    });
  });

  it('Should parse same option multiple times along with file name ', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', '-n', '3', 'a.txt']), {
      fileName: ['a.txt'],
      option: { option: '-n', optionArg: 3 }
    });
  });

  it('Should throw an error when option is invalid', () => {
    assert.throws(() => parseArgs(['-h']), {
      name: 'illegalOption',
      message: 'head: illegal option -- h\nusage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('Should throw an error when count is invalid', () => {
    assert.throws(() => parseArgs(['-n', '0', 'a.txt']), {
      name: 'illegalCount',
      message: 'head: illegal line count -- 0'
    });
  });

});
