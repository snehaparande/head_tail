const assert = require('assert');
const { parseTailArgs } = require('../src/parseTailArgs.js');

describe('parseTailArgs', () => {
  it('Should parse only file name ', () => {
    assert.deepStrictEqual(parseTailArgs(['a.txt']), {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 10 }
    });
  });

  it('Should parse -n option with optionArg', () => {
    const expected = {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 2 }
    };
    assert.deepStrictEqual(parseTailArgs(['-n', '2', 'a.txt']), expected);
  });

  it('Should parse -c option along with file name ', () => {
    assert.deepStrictEqual(parseTailArgs(['-c', '5', 'a.txt']), {
      files: ['a.txt'],
      options: { option: '-c', optionArg: 5 }
    });
  });

  it('Should throw an error when option is invalid', () => {
    assert.throws(() => parseTailArgs(['-h']), {
      name: 'illegalOption',
      message: 'tail: illegal option -- h\nusage: tail  [-r] [-q] [-c # | -n #] [file ...]'
    });
  });

  it('Should throw an error when count is invalid', () => {
    assert.throws(() => parseTailArgs(['-n', '0', 'a.txt']), {
      name: 'illegalCount',
      message: 'tail: illegal offset -- 0'
    });
  });

  it('Should parse the option when option and count are together', () => {
    assert.deepStrictEqual(parseTailArgs(['-n2', 'a.txt']), {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 2 }
    });
  });

  it('Should parse multiple files', () => {
    assert.deepStrictEqual(parseTailArgs(['a.txt', 'b.txt', 'c.txt']), {
      files: ['a.txt', 'b.txt', 'c.txt'],
      options: { option: '-n', optionArg: 10 }
    });
  });

  it('Should parse multiple files along with options', () => {
    assert.deepStrictEqual(parseTailArgs(['-c', '2', 'a.txt', 'b.txt']), {
      files: ['a.txt', 'b.txt'],
      options: { option: '-c', optionArg: 2 }
    });
  });

  it('Should throw usage error when no files are given', () => {
    assert.throws(() => parseTailArgs(['-n', '2']), {
      name: 'usageError',
      message: 'usage: tail  [-r] [-q] [-c # | -n #] [file ...]'
    });
    assert.throws(() => parseTailArgs([]), {
      name: 'usageError',
      message: 'usage: tail  [-r] [-q] [-c # | -n #] [file ...]'
    });
  });

  it('Should parse arguments from format -[number]', () => {
    assert.deepStrictEqual(parseTailArgs(['-2', 'a.txt']), {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 2 }
    });
  });

  it('should throw an error when options are combined', () => {
    assert.throws(() => parseTailArgs(['-n', '2', '-c', '2', 'a.txt']), {
      name: 'usageError',
      message: 'usage: tail  [-r] [-q] [-c # | -n #] [file ...]'
    });
  });

});
