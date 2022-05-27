const assert = require('assert');
const {
  parseHeadArgs,
  validCount,
  validOption,
  splitCombinedOptions
} = require('../src/parseHeadArgs.js');

describe('validCount', () => {
  it('Should return valid count if count is valid', () => {
    assert.strictEqual(validCount('-n', '2'), 2);
  });

  it('Should throw an error when count is not valid', () => {
    assert.throws(() => validCount('-n', '0'), {
      name: 'illegalCount',
      message: 'head: illegal line count -- 0'
    });
    assert.throws(() => validCount('-n', 'a'), {
      name: 'illegalCount',
      message: 'head: illegal line count -- a'
    });
  });

});

describe('validOption', () => {
  it('Should return valid option when option is valid', () => {
    assert.strictEqual(validOption('-n'), '-n');
  });

  it('Should throw an error when option is illegal', () => {
    assert.throws(() => validOption('-h'), {
      name: 'illegalOption',
      message: 'head: illegal option -- h\nusage: head [-n lines | -c bytes] [file ...]'
    });
  });

});

describe('splitCombinedOptions', () => {
  it('should split the combined options', () => {
    const expected = ['-n', '2', '-c', '3'];
    assert.deepStrictEqual(splitCombinedOptions(['-n2', '-c3']), expected);
  });

});

describe('parseHeadArgs', () => {
  it('Should parse only file name ', () => {
    assert.deepStrictEqual(parseHeadArgs(['a.txt']), {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 10 }
    });
  });

  it('Should parse -n option along with file name ', () => {
    assert.deepStrictEqual(parseHeadArgs(['-n', '5', 'a.txt']), {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 5 }
    });
  });

  it('Should parse -c option along with file name ', () => {
    assert.deepStrictEqual(parseHeadArgs(['-c', '5', 'a.txt']), {
      files: ['a.txt'],
      options: { option: '-c', optionArg: 5 }
    });
  });

  it('Should parse same option multiple times along with file name ', () => {
    assert.deepStrictEqual(parseHeadArgs(['-n', '5', '-n', '3', 'a.txt']), {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 3 }
    });
  });

  it('Should throw an error when option is invalid', () => {
    assert.throws(() => parseHeadArgs(['-h']), {
      name: 'illegalOption',
      message: 'head: illegal option -- h\nusage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('Should throw an error when count is invalid', () => {
    assert.throws(() => parseHeadArgs(['-n', '0', 'a.txt']), {
      name: 'illegalCount',
      message: 'head: illegal line count -- 0'
    });
  });

  it('Should parse the option when option and count are together', () => {
    assert.deepStrictEqual(parseHeadArgs(['-n2', 'a.txt']), {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 2 }
    });
  });

  it('Should parse multiple files', () => {
    assert.deepStrictEqual(parseHeadArgs(['a.txt', 'b.txt', 'c.txt']), {
      files: ['a.txt', 'b.txt', 'c.txt'],
      options: { option: '-n', optionArg: 10 }
    });
  });

  it('Should parse multiple files along with options', () => {
    assert.deepStrictEqual(parseHeadArgs(['-c', '2', 'a.txt', 'b.txt', 'c.txt']), {
      files: ['a.txt', 'b.txt', 'c.txt'],
      options: { option: '-c', optionArg: 2 }
    });
  });

  it('Should throw usage error when no files are given', () => {
    assert.throws(() => parseHeadArgs(['-n', '2']), {
      name: 'usageError',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
    assert.throws(() => parseHeadArgs([]), {
      name: 'usageError',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('Should parse arguments from format -[number]', () => {
    assert.deepStrictEqual(parseHeadArgs(['-2', 'a.txt']), {
      files: ['a.txt'],
      options: { option: '-n', optionArg: 2 }
    });
  });

  it('should throw an error when options are combined', () => {
    assert.throws(() => parseHeadArgs(['-n', '2', '-c', '2', 'a.txt']), {
      name: 'combinedOptionsError',
      message: 'head: can\'t combine line and byte counts'
    });
  });

});
